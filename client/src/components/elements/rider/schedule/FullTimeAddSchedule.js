import React, {useState} from "react"
import {Divider, Header, Dropdown, Table, Button} from "semantic-ui-react";
import moment from "moment";
import ShiftsUtils from "../../../commons/ShiftsUtils";

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    "Thursday",
    "Friday",
    "Saturday"
]

export default function FullTimeAddSchedule({startDate, endDate, submitSchedule}) {
    const [workingDays, setWorkingDays] = useState(null)

    function handleDaysChange(e, {value}) {
        let arr = value.map(x => {
            return {day: x, shift_no: ShiftsUtils.shiftOptions[0].value}
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
                options={ShiftsUtils.daysOptions}
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
                                        options={ShiftsUtils.shiftOptions}
                                        defaultValue={ShiftsUtils.shiftOptions[0].value}
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