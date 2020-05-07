import React, {useState, useEffect, useReducer} from "react"
import {
    Header,
    Divider,
    Grid,
    Card, Button
} from "semantic-ui-react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FullTimeAddSchedule from "./FullTimeAddSchedule";
import PartTimeAddSchedule from "./PartTimeAddSchedule";
import Utils from "../../../commons/Utils";

const error_range_msg = "Range Specified contains clashing schedule!"

const days = (riderType) => {
    switch (riderType) {
        case "PT":
            return 7;
        case "FT":
            return 28;
        default:
            return 0;
    }
}

function isDateOccupied(date, occupiedDates) {
    return !occupiedDates.some(x => {
        return moment(date).isSame(moment(x))
    });
}

function validRange(startDate, endDate, occupiedDates) {
    return !occupiedDates.some(x => {
        return moment(x).isBetween(startDate, endDate, null, [])
    })
}

const StartDateButton = ({value, onClick}) => (
    <Button onClick={onClick} size={'medium'}>
        {value || "Start Date"}
    </Button>
)

const EndDateButton = ({value, onClick}) => (
    <Button onClick={onClick} size={'medium'}>
        {value || "End Date"}
    </Button>
)

export default function PopupAddSchedule({openPopup, occupiedDates, riderType, submitSchedule}) {
    const minStartDate = moment(new Date()).add(1, 'days').toDate();
    const minEndDate = moment(new Date()).add(days(riderType), 'days').toDate();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [errors, setErrors] = useReducer(Utils.reducer, {
        range: null
    })

    const setRange = (type, date) => {
        switch (type) {
            case "start":
                setStartDate(date)
                setEndDate(moment(date).add(days(riderType) - 1, 'day').toDate())
                return
            case "end":
                setEndDate(date)
                setStartDate(moment(date).add(-days(riderType) + 1, 'day').toDate())
                return
            default:
                return;
        }
    }

    useEffect(()=> {
        if (startDate && endDate) {
            let boo = validRange(startDate, endDate, occupiedDates);
            setErrors({type: "range", payload: boo})
        }
    }, [startDate, endDate, occupiedDates])

    function submitFTSchedule(workingDays) {

        let skeleton = Array.apply(null, new Array(days(riderType)))
        let start_d = moment(startDate)
        console.log(workingDays)

        let arr = skeleton.map((x,idx) => {
            const week = Math.floor(idx/4)
            const day = (idx % 7) + 1
            const date = start_d.add(1,'days').toDate()
            var found = workingDays.find(x => x.day === date.getDay())
            found = (found === undefined || found === null) ? null : found.shift_no
            return {week: week, day: day, date: date, shift: found}
        }).filter(x => x.shift > 0)

        console.log("length" + arr.length)
        return submitSchedule(arr)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => openPopup(false)}>x</span>
                <>
                    <Header as='h2'>Add Schedule</Header>
                    <Divider/>
                    <Header sub>{`${riderType} Rider`}</Header>
                    <Card fluid>
                        <Card.Content textAlign={'left'}>
                            <Card.Header>{`Specify Period (${days(riderType)} days)`}</Card.Header>
                            <Grid columns={2} relaxed='very'>
                                <Grid.Column>
                                    <Header sub>Start </Header>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setRange("start",date)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={minStartDate}
                                        filterDate={(date) => isDateOccupied(date, occupiedDates)}
                                        highlightDates={occupiedDates}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        customInput={<StartDateButton/>}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Header sub>End </Header>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setRange("end",date)}
                                        dateFormat="dd/MM/yyyy"
                                        minDate={minEndDate}
                                        filterDate={(date) => isDateOccupied(date, occupiedDates)}
                                        highlightDates={occupiedDates}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        customInput={<EndDateButton/>}
                                    />
                                </Grid.Column>
                            </Grid>
                            {!errors.range && errors.range !== null && <Card.Meta>{error_range_msg}</Card.Meta>}
                        </Card.Content>
                    </Card>

                    {errors.range && riderType === "FT" && (
                        <FullTimeAddSchedule startDate={startDate} endDate={endDate}
                                             submitSchedule={submitFTSchedule}
                        />
                    )}

                    {errors.range && riderType === "PT" && (
                        <PartTimeAddSchedule startDate={startDate} endDate={endDate}
                                             submitSchedule={submitSchedule}
                        />
                    )}

                </>
            </div>
        </div>
    )
}