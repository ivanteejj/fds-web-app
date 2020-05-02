import React, {useState, useEffect} from "react"
import {Button, Divider, Header, Table} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";

export default function PartTimeAddSchedule({startDate, endDate, submitSchedule}) {
    const [workingDays, setWorkingDays] = useState(null)
    const [totalHours, setTotalHours] = useState(0)
    const [incompleteFields, setIncompleteFields] = useState(false)

    useEffect(() => {
        if (startDate && endDate) {
            let start_d = moment(startDate)
            let skeleton = Array.apply(null, new Array(7))

            let arr = skeleton.map((x, idx) => {
                const date = start_d.add(1,'days').toDate()
                return {day: idx+1, date: date, shifts: []}
            })

            setWorkingDays(arr)
        }

    }, [startDate, endDate])

    useEffect(() => {
        if (workingDays) {
            computeTotalHours();
            checkIncompleteFields();
        }
    }, [workingDays])

    const StartTimeButton = ({value, onClick}) => (
        <Button onClick={onClick} size={'medium'}>
            {value || "Start Time"}
        </Button>
    )

    const EndTimeButton = ({value, onClick}) => (
        <Button onClick={onClick} size={'medium'}>
            {value || "End Time"}
        </Button>
    )

    const initializeNewShift = (idx) => {
        setWorkingDays(x => {
            return [...x.slice(0, idx),
                {...x[idx], shifts: [...x[idx].shifts, {time_start: null, time_end: null, time_interval: null}]},
                ...x.slice(idx+1)
                ]
        })
    }

    const removeDayShifts = (idx) => {
        setWorkingDays(x => {
            return [...x.slice(0, idx), {...x[idx], shifts: []}, ...x.slice(idx+1)]
        })
    }

    const updateShift = (pidx, cidx, type, dateTime) => {
        let interval = null;
        if (type !== "remove") {
            let dt = workingDays[pidx].date;
            //set date portion
            dateTime.setDate(dt.getDate());
            dateTime.setMonth(dt.getMonth());
            dateTime.setFullYear(dt.getFullYear());

            var start_dt = type === "start" ? dateTime : workingDays[pidx].shifts[cidx].time_start;
            var end_dt = type === "end" ? dateTime : workingDays[pidx].shifts[cidx].time_end;
            interval = start_dt && end_dt ? end_dt.getHours() - start_dt.getHours() : null;
        }

        setWorkingDays( () => {
            return workingDays.map((item, index) => {
                if (index === pidx) {
                    switch (type) {
                        case "start":
                            return {...item, shifts: item.shifts.map((item, idx) => {
                                    if (idx === cidx)
                                        return {...item, time_start: dateTime, time_interval: interval}
                                    else
                                        return item
                                    })
                            };
                        case "end":
                            return {...item, shifts: item.shifts.map((item, idx) => {
                                    if (idx === cidx)
                                        return {...item, time_end: dateTime, time_interval: interval}
                                    else
                                        return item
                                    })
                            };
                        case "remove":
                            return {...item, shifts: item.shifts.filter((x, idx) => idx !== cidx)};
                        default:
                            return item;
                    }
                } else {
                    return item
                }
            })
        })
    }

    const canAddMoreShift = (item) => {
        var size = item.shifts.length;
        if (size < 1) return false;

        var maxDate = moment(item.date).hour(22).minute(0).toDate();
        let last_shift =  item.shifts[size - 1];
        if (!(last_shift.time_start && last_shift.time_end)) {
            return true;
        }
        return maxDate.getHours() - last_shift.time_end.getHours() < 3;
    }

    const filterMinDateDropdown = (type, x, idx) => {
        switch (type) {
            case "start":
                if (idx > 0) {
                    return moment(x.shifts[idx-1].time_end).add(2,'hour').toDate();
                } else {
                    return moment(x.date).hour(10).minute(0).toDate()
                }
            case "end":
                if (x.shifts[idx].time_start) {
                    return moment(x.shifts[idx].time_start).add(1, 'hour').toDate()
                } else {
                    return moment(x.date).hour(11).minute(0).toDate()
                }
            default:
                return;
        }

    }

    const computeTotalHours = () => {
        // compute total working hours
        let total = workingDays.reduce((accum, x) =>
            accum + x.shifts.reduce((accum, y) => accum +
            (y.time_interval ? y.time_interval : 0) ,0)
            , 0);
        setTotalHours(total);
    }

    const checkIncompleteFields = () => {
        return setIncompleteFields(
            workingDays.some(item => item.shifts.some(x => !(x.time_start && x.time_end)))
        )
    }

    const disableSubmit = () => {
        return incompleteFields || totalHours < 10 || totalHours > 48
    }

    const displayError = () => {
        if (incompleteFields) {
            return "Incomplete fields! Please remove or fill in all fields!"
        } else if (totalHours < 10) {
            return "Insufficient hours! Total working hours must be at least 10 hours!"
        } else if (totalHours > 48) {
            return "Exceeding hours! Total working hours must be less than 48 hours!"
        } else {
            return;
        }
    }

    return (
        <>
            <Header as={'h4'}>Working Days</Header>
            <Header as={'h3'}>{`${moment(startDate).format("Do MMM YY")} - ${moment(endDate).format("Do MMM YY")}`}</Header>
            <Divider/>

            {workingDays && (
                <>
                    <Header as={'h4'}>Week Schedule</Header>
                    <Header sub>{`Total Working Hours: ${totalHours}`}</Header>
                    <Table celled>
                        <Table.Body>
                            {workingDays.map((item, index) => (
                                <Table.Row>
                                        <Table.Cell width={3}>
                                            {`Day ${item.day} (${moment(item.date).format("ddd, Do MMM YY")})`}
                                        </Table.Cell>
                                        <Table.Cell width={1} textAlign={'center'}>
                                            <Button icon={'plus'} size={'tiny'}
                                                    onClick={() => initializeNewShift(index)}
                                                    color={'orange'}
                                                    disabled={canAddMoreShift(item)}
                                            />
                                            <Button icon={'close'} size={'tiny'}
                                                    onClick={() => removeDayShifts(index)}
                                                    color={item.shifts.length < 1 ? null : 'red'}
                                                    disabled={item.shifts.length < 1}
                                            />
                                        </Table.Cell>
                                        <Table.Cell width={9}>
                                            {item.shifts.length > 0 && item.shifts.map((x, idx) => (
                                                <Table.Row width={9}>
                                                    <Header sub>{`Shift ${idx+1} `}</Header>
                                                    <DatePicker
                                                        selected={x.time_start}
                                                        onChange={date => updateShift(index, idx, "start",date)}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={60}
                                                        customInput={<StartTimeButton/>}
                                                        minTime={filterMinDateDropdown("start", item, idx)}
                                                        maxTime={moment(item.date).hour(21).minute(0).toDate()}
                                                        dateFormat="h:mm aa"
                                                    />

                                                    <DatePicker
                                                        selected={x.time_end}
                                                        onChange={date => updateShift(index, idx, "end",date)}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={60}
                                                        customInput={<EndTimeButton/>}
                                                        minTime={filterMinDateDropdown("end", item, idx)}
                                                        maxTime={moment(item.date).hour(22).minute(0).toDate()}
                                                        dateFormat="h:mm aa"
                                                    />

                                                    <Button icon={'close'} size={'tiny'}
                                                            onClick={() => updateShift(index, idx, "remove", null)}
                                                            color={'red'}
                                                    />
                                                </Table.Row>
                                            ))}
                                        </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </>
            )}

            {disableSubmit() && (
                <Header size='small' color={'red'}> {displayError()} </Header>
            )}

            <Button
                content={'Submit Schedule'}
                color={ disableSubmit() ? "grey" : "teal"}
                disabled={disableSubmit()}
                onClick={() => submitSchedule(workingDays)}
            />
        </>
    )
}