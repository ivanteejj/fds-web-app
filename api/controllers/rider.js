var express = require('express');

const queryToGetAllReviewsOfOneRider =
    "select rname as riderid, rider_rating as rating, rider_review as review, order_delivered\n" +
    "from orders JOIN Riders using (rider_id)\n" +
    "where rider_id = $1 and order_delivered IS NOT NULL;"

const getAllReviewsOfOneRider = (req, res, db) => {
    const rider_id = req.query.rider_id
    const output = db.query(queryToGetAllReviewsOfOneRider, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetAllCurrentlyAvailableRider =
    "with monthly as (\n" +
    "select sid, sche_date, time_start1, time_end1, time_start2, time_end2\n" +
    "from Schedules s1 natural join Monthly_Work_Schedule m1 natural join shifts x1\n" +
    "),\n" +
    "weekly as (\n" +
    "select sid, sche_date, time_start as time_start1, time_end as time_end1, time_start as time_start2, time_end as time_end2\n" +
    "from Schedules natural join Weekly_Work_Schedule\n" +
    "),\n" +
    "sid_table as (\n" +
    "select *\n" +
    "from monthly\n" +
    "union\n" +
    "select *\n" +
    "from weekly\n" +
    ")\n" +
    "\n" +
    "select rider_id, rname\n" +
    "from riders r1 natural join schedules s1 natural join sid_table x1\n" +
    "where (sche_date = CURRENT_TIMESTAMP::date) and \n" +
    "((CURRENT_TIMESTAMP::time > time_start1 and CURRENT_TIMESTAMP::time < time_end1) or \n" +
    "    (CURRENT_TIMESTAMP::time > time_start2 and CURRENT_TIMESTAMP::time < time_end2))\n" +
    ";\n"

const getAllCurrentlyAvailableRider = (req, res, db) => {
    const output = db.query(queryToGetAllCurrentlyAvailableRider,
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetSummaryForRider =
    "with monthly_temp as (\n" +
    "select sid, min(sche_date) as start_dt, max(sche_date) as end_dt, count(*) as numShifts, 0 as totalDuration\n" +
    "from Schedules natural join Monthly_Work_Schedule\n" +
    "group by sid\n" +
    "),\n" +
    "weekly_temp as (\n" +
    "select sid, min(sche_date) as start_dt, max(sche_date) as end_dt, 0 as numShifts, sum(duration) as totalDuration\n" +
    "from Schedules natural join Weekly_Work_Schedule\n" +
    "group by sid\n" +
    "),\n" +
    "temp as (\n" +
    "select *\n" +
    "from monthly_temp\n" +
    "union\n" +
    "select *\n" +
    "from weekly_temp\n" +
    "),\n" +
    "monthly as (\n" +
    "select sid, sche_date, time_start1, time_end1, time_start2, time_end2\n" +
    "from Schedules s1 natural join Monthly_Work_Schedule m1 natural join shifts x1\n" +
    "),\n" +
    "weekly as (\n" +
    "select sid, sche_date, time_start as time_start1, time_end as time_end1, time_start as time_start2, time_end as time_end2\n" +
    "from Schedules natural join Weekly_Work_Schedule\n" +
    "),\n" +
    "sid_table as (\n" +
    "select *\n" +
    "from monthly\n" +
    "union\n" +
    "select *\n" +
    "from weekly\n" +
    "),\n" +
    "ordersDelivered as (\n" +
    "select t1.sid, count(*) as totalOrders, sum(o1.rider_bonus) as sid_bonus\n" +
    "from sid_table t1 natural join schedules s1 natural join orders o1\n" +
    "where (o1.order_placed::date = t1.sche_date) and\n" +
    "((o1.order_placed::time > t1.time_start1 and o1.order_placed::time < t1.time_end1)\n" +
    "or ((o1.order_placed::time > t1.time_start2 and o1.order_placed::time < t1.time_end2)))\n" +
    "group by t1.sid\n" +
    ")\n" +
    "select sid as sch_id, start_dt, end_dt,\n" +
    "case\n" +
    "    when numShifts = 0 then totalDuration\n" +
    "    else numShifts*8\n" +
    "end as total_hours, totalOrders as total_orders_delivered,\n" +
    "r1.base_salary + sid_bonus as total_salary\n" +
    "from temp t1 natural join ordersDelivered o1 natural join schedules x1 natural join riders r1\n" +
    "where t1.sid = x1.sid and x1.rider_id = r1.rider_id\n" +
    "AND x1.rider_id = $1\n" +
    ";"

const getSummaryForRider = (req, res, db) => {
    const rider_id = req.query.rider_id
    console.log(rider_id)
    const output = db.query(queryToGetSummaryForRider, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetRiderEarnings =
    "with monthly_temp as (\n" +
    "select sid, min(sche_date) as start_dt, max(sche_date) as end_dt, count(*) as numShifts, 0 as totalDuration\n" +
    "from Schedules natural join Monthly_Work_Schedule\n" +
    "group by sid\n" +
    "),\n" +
    "weekly_temp as (\n" +
    "select sid, min(sche_date) as start_dt, max(sche_date) as end_dt, 0 as numShifts, sum(duration) as totalDuration\n" +
    "from Schedules natural join Weekly_Work_Schedule\n" +
    "group by sid\n" +
    "),\n" +
    "temp as (\n" +
    "select *\n" +
    "from monthly_temp\n" +
    "union\n" +
    "select *\n" +
    "from weekly_temp\n" +
    "),\n" +
    "monthly as (\n" +
    "select sid, sche_date, time_start1, time_end1, time_start2, time_end2\n" +
    "from Schedules s1 natural join Monthly_Work_Schedule m1 natural join shifts x1\n" +
    "),\n" +
    "weekly as (\n" +
    "select sid, sche_date, time_start as time_start1, time_end as time_end1, time_start as time_start2, time_end as time_end2\n" +
    "from Schedules natural join Weekly_Work_Schedule\n" +
    "),\n" +
    "sid_table as (\n" +
    "select *\n" +
    "from monthly\n" +
    "union\n" +
    "select *\n" +
    "from weekly\n" +
    "),\n" +
    "ordersDelivered as (\n" +
    "select t1.sid, count(*) as totalOrders, sum(o1.rider_bonus) as sid_bonus\n" +
    "from sid_table t1 natural join schedules s1 natural join orders o1\n" +
    "where (o1.order_placed::date = t1.sche_date) and\n" +
    "((o1.order_placed::time > t1.time_start1 and o1.order_placed::time < t1.time_end1)\n" +
    "or ((o1.order_placed::time > t1.time_start2 and o1.order_placed::time < t1.time_end2)))\n" +
    "group by t1.sid\n" +
    ")\n" +
    "select sid as sch_id,  start_dt::timestamp::date, end_dt::timestamp::date,\n" +
    "case\n" +
    "    when numShifts = 0 then totalDuration\n" +
    "    else numShifts*8\n" +
    "end as total_hours, totalOrders as total_Orders_Delivered, sid_bonus as bonus\n" +
    "from temp t1 natural join ordersDelivered o1 natural join schedules x1 natural join riders r1\n" +
    "where t1.sid = x1.sid and x1.rider_id = r1.rider_id and x1.rider_id = $1\n" +
    ";"

const getEarningsForRider = (req, res, db) => {
    const rider_id = req.query.rider_id
    console.log(rider_id)
    const output = db.query(queryToGetRiderEarnings, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetSchedule =
    "with monthly_temp as (\n" +
    "select sid, sche_date, time_start1 as time_start, time_end1 as time_end, 4 as duration\n" +
    "from Schedules natural join Monthly_Work_Schedule natural join Shifts x1\n" +
    "union\n" +
    "select sid, sche_date, time_start2 as time_start, time_end2 as time_end, 4 as duration\n" +
    "from Schedules natural join Monthly_Work_Schedule natural join Shifts x1\n" +
    "),\n" +
    "total_shifts as (\n" +
    "select *\n" +
    "from monthly_temp\n" +
    "union\n" +
    "select *\n" +
    "from weekly_work_schedule\n" +
    ")\n" +
    "select sid as sch_id, sche_date as date, time_start, time_end, duration as time_interval\n" +
    "from schedules s1 natural join total_shifts\n" +
    "where s1.rider_id = $1\n" +
    "order by sche_date\n" +
    ";\n"

const getSchedule = (req, res, db) => {
    const rider_id = req.query.rider_id
    console.log(rider_id)
    const output = db.query(queryToGetSchedule, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}


module.exports = {
    getAllReviewsOfOneRider: getAllReviewsOfOneRider,
    getAllCurrentlyAvailableRider: getAllCurrentlyAvailableRider,
    getSummaryForRider: getSummaryForRider,
    getEarningsForRider: getEarningsForRider,
    getSchedule: getSchedule
};

