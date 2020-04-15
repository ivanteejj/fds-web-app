import React, {createRef, useEffect, useState} from "react"
import {
    Grid,
    Divider,
    Radio,
    Header,
    Input
} from "semantic-ui-react";
import moment from "moment"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"

const fakeSchedulePT = {
    // part time
    // data should already be sorted in desc order by date
    data: [
        {
            sch_id: 1222, day: 1, date: "15/04/2020", time_start: "12:00", time_end: "15:00", time_interval: 3
        },
        {
            sch_id: 1222, day: 1, date: "15/04/2020", time_start: "17:00", time_end: "20:00", time_interval: 2
        },
        {
            sch_id: 1222, day: 2, date: "06/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        },
        {
            sch_id: 1222, day: 3, date: "07/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        },
        {
            sch_id: 1222, day: 4, date: "08/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        },
        {
            sch_id: 1222, day: 5, date: "09/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        },
        {
            sch_id: 1222, day: 6, date: "10/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        },
        {
            sch_id: 1222, day: 7, date: "11/04/2020", time_start: "12:00", time_end: "16:00", time_interval: 4
        }
    ]
}

const datetime_format = "DD/MM/YYYY HH:mm";
const time_format = "HH:mm";
const pretty_time_format = "ha";

function transform(data) {
    return data.map(item => {
        return {title: `${moment(item.time_start, time_format).format(pretty_time_format)} - 
                        ${moment(item.time_end, time_format).format(pretty_time_format)}`,
                start: moment(item.date + " " + item.time_start, datetime_format).toDate(),
                end: moment(item.date + " " + item.time_end, datetime_format).toDate()}
    })
}

export default function Schedule() {
    const calendarComponentRef = createRef()

    const [schedule, setSchedule] = useState([])
    const [riderType, setRiderType] = useState(null);

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            setSchedule(transform(fakeSchedulePT.data));
            // retrieve rider type
            setRiderType("part-time");
        })()
    }, [])

    return (
        <>
            <Grid>
                <Grid.Column width={2}/>
                <Grid.Column width={12} textAlign={'center'}>
                    <h1>My Schedule</h1>

                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        ref={calendarComponentRef}
                        weekends={true}
                        events={schedule}
                    />
                </Grid.Column>
                <Grid.Column width={2}/>
            </Grid>
        </>
    )
}