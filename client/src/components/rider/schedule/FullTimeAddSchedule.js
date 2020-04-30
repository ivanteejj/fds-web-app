import React, {useState} from "react"
import {Divider, Header, Dropdown, Table, Button} from "semantic-ui-react";
import moment from "moment";

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    "Thursday",
    "Friday",
    "Saturday"
]

const daysOptions = [
    {
        text: 'Monday to Friday',
        value: [1,2,3,4,5]
    },
    {
        text: 'Tuesday to Saturday',
        value: [2,3,4,5,6]
    },
    {
        text: 'Wednesday to Sunday',
        value: [3,4,5,6,0]
    },
    {
        text: 'Thursday to Monday',
        value: [4,5,6,0,1]
    },
    {
        text: 'Friday to Tuesday',
        value: [5,6,0,1,2]
    },
    {
        text: 'Saturday to Wednesday',
        value: [6,0,1,2,3]
    },
    {
        text: 'Sunday to Thursday',
        value: [0,1,2,3,4]
    }
]

const shiftOptions = [
    {
        text: 'Shift 1: 10am - 2pm and 3pm - 7pm',
        value: 1
    },
    {
        text: 'Shift 2: 11am - 3pm and 4pm - 8pm',
        value: 2
    },
    {
        text: 'Shift 3: 12pm - 4pm and 5pm - 9pm',
        value: 3
    },
    {
        text: 'Shift 4: 1pm - 5pm and 6pm - 10pm',
        value: 4
    }

]

const shiftType = [
    [{time_start: "10:00", time_end: "14:00", time_interval: 4},
        {time_start: "15:00", time_end: "19:00", time_interval: 4}],

    [{time_start: "11:00", time_end: "15:00", time_interval: 4},
        {time_start: "16:00", time_end: "20:00", time_interval: 4}],

    [{time_start: "12:00", time_end: "16:00", time_interval: 4},
        {time_start: "17:00", time_end: "21:00", time_interval: 4}],

    [{time_start: "13:00", time_end: "17:00", time_interval: 4},
        {time_start: "18:00", time_end: "22:00", time_interval: 4}]
]

export default function FullTimeAddSchedule({startDate, endDate, submitSchedule}) {
    const [workingDays, setWorkingDays] = useState(null)

    function handleDaysChange(e, {value}) {
        let arr = value.map(x => {
            return {day: x, shift_no: shiftOptions[0].value}
        })
        setWorkingDays(arr)
    }

    function handleShiftChange(value, idx) {
        setWorkingDays(
            workingDays.map((x, id) => id === idx ? {...x, shift_no: value} : x)
        )
    }

    return (
        <>
            <Header as={'h3'}>{`${moment(startDate).format("Do MMM YY")} - ${moment(endDate).format("Do MMM YY")}`}</Header>
            <Divider/>
            <Header as={'h4'}>Working Days</Header>
            <Dropdown
                selection
                options={daysOptions}
                onChange={handleDaysChange}
            />

            {workingDays && (
                <>
                    <Header as={'h4'}>Working Shifts</Header>
                    <Table celled>
                        <Table.Body>
                        {workingDays.map((item, idx) => (
                            <Table.Row>
                                <Table.Cell>{days[item.day]}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown
                                        selection
                                        options={shiftOptions}
                                        defaultValue={shiftOptions[0].value}
                                        onChange={(e, {value}) => handleShiftChange(value, idx)}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        </Table.Body>
                    </Table>

                    <Button content={'Submit Schedule'}
                            color={'teal'}
                            onClick={() => submitSchedule(workingDays)}
                    />
                </>
            )}

        </>
    )
}