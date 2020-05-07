import React, {createRef, useEffect, useState} from "react"
import {
    Grid,
    Button
} from "semantic-ui-react";
import moment from "moment"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import PopupAddSchedule from "../../../elements/rider/schedule/PopupAddSchedule";
import DateTimeUtils from "../../../commons/DateTimeUtils";
import axios from "axios";

const fakeSchedulePT = {
    // part time
    // data should already be sorted in desc order by date
    data: [
        {
            sch_id: 1221, day: 1, date: "15/03/2020", time_start: "12:00", time_end: "15:00", time_interval: 3
        },
        {
            sch_id: 1222, day: 1, date: "17/04/2020", time_start: "12:00", time_end: "15:00", time_interval: 3
        },
        {
            sch_id: 1222, day: 1, date: "20/04/2020", time_start: "17:00", time_end: "20:00", time_interval: 2
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

const datetime_format = "DD/MM/YYYY HH:mm:ss";
const date_format = "DD/MM/YYYY";
const time_format = "HH:mm:ss";
const pretty_time_format = "ha";

function transform(data) {
    return data.map(item => {
        return {title: `${moment(item.time_start, time_format).format(pretty_time_format)} - ${moment(item.time_end, time_format).format(pretty_time_format)}
                        (${item.time_interval} hours)`,
                start: moment(item.date + " " + item.time_start, datetime_format).toDate(),
                end: moment(item.date + " " + item.time_end, datetime_format).toDate()}
    })
}

function formatDT(data) {
    return data.map(item => {
        return {...item, date: DateTimeUtils.stringtifyDate(item.date)}
    })
}

function getOccupiedDates(data) {
    // filter to get distinct dates
    return data
        .map(item => item.date)
        .reduce((prev, curr) => prev.concat(curr), [])
        .filter((item, i, arr) => arr.indexOf(item) === i)
        .map(x => moment(x, date_format).toDate());
}

function formatPT(data, sid) {
    let a =  data.filter(x => x.shifts.length > 0);
    let arr = a.reduce((results, item) => [...results, ...item.shifts.map(x => ({ ...item, shifts: x }))], []);
    return arr.map(x => {
            return {
                "sid": sid, "sche_date": DateTimeUtils.stringtifyDate(x.date),
                "duration": x.shifts.time_interval,
                "time_start": DateTimeUtils.stringtifyTime(x.shifts.time_start),
                "time_end": DateTimeUtils.stringtifyTime(x.shifts.time_end)
            }
        })
}

function formatFT(data, sid) {
    console.log(data)
}

export default function Schedule({userid}) {
    const calendarComponentRef = createRef()

    const [schedule, setSchedule] = useState([])
    const [occupiedDates, setOccupiedDates] = useState([])
    const [riderType, setRiderType] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (boo) => {
        setShowPopup(boo);
    }

    useEffect(() => {
        (async() => {
            let user = userid
            await axios.get('/Rider/getOneRiderDetail/', {
                    params: {
                        rider_id: user
                    }
                }).then((response) => setRiderType(response.data[0].rider_type))
            await axios.get('/Rider/getSchedule/', {
                params: {
                    rider_id: user
                }
            }).then((response) => setSchedule(formatDT(response.data)))

        })()
    }, [])

    useEffect(() => {
        // auto trigger when dependency is updated
        setOccupiedDates(getOccupiedDates(schedule))
    }, [schedule])

    function submitSchedule(schedule) {
        // TODO: (backend) code here to submit schedule
        (async() => {
            // check rider type before processing

            /* schedule parsed in will look sth lke this:
            * full time schedule = [{week: 1, day: 1, date: "13/04/2020", shift: 1} ...]
            * part time schedule = [{day: 1, date: "13/04/2020",
            *                        shifts: [{time_start: Sat May 02 2020 10:00:00 GMT+0800 (+08), time_end: Sat May 02 2020 12:00:00 GMT+0800 (+08), time_interval: 2},
            *                                {time_start: Sat May 02 2020 14:00:00 GMT+0800 (+08), time_end: Sat May 02 2020 16:00:00 GMT+0800 (+08), time_interval: 2}]]
            */
            console.log("length of schedule " + schedule.length);
            console.log(schedule)
            await axios
                .post('/Rider/setupSchedule/', {
                    rider_id: userid
                })
                .then( (resp) => {
                    let sid = resp.data[0].sid;
                    if (riderType === "PT") {
                        console.log(schedule)
                        let a = formatPT(schedule, sid)
                        console.log(a)
                        var data = JSON.stringify(a)
                        console.log(data)
                        axios
                            .post('/Rider/addWWS/', {
                                table: data
                            })
                            .then( (resp) => {
                                console.log(resp);
                            }, (error) => {
                                console.log(error);
                            });
                    } else {
                        console.log("Full timer!")
                        let sid = resp.data[0].sid;
                        console.log(schedule)
                        console.log(sid)
                        let a = formatFT(schedule, sid)
                    }
                }, (error) => {
                    console.log(error);
                });

            // await two promises
            // 1. send schedule to backend, await for successful response
            // 2. upon response received, retrieve schedule data agn for re-render
            // setSchedule(*retrieved data from step 2*)

            // close popup window
            openPopup(false)
        }) ()
    }

    return (
        <>
            <Grid>
                <Grid.Column width={2}/>
                <Grid.Column width={12} textAlign={'left'}>
                    {!showPopup && (
                        <>
                            <h1>My Schedule</h1>

                            <Button floated={'right'}
                                    content={'Add Schedule'}
                                    color={'orange'}
                                    onClick={() => openPopup(true)}
                            />

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
                                events={transform(schedule)}
                            />
                        </>
                    )}
                </Grid.Column>
                <Grid.Column width={2}/>
            </Grid>

            {showPopup && (
                <PopupAddSchedule riderType={riderType} openPopup={openPopup}
                                  occupiedDates={occupiedDates} submitSchedule={submitSchedule}
                />
            )}
        </>
    )
}