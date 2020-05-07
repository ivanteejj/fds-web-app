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


module.exports = {
    getAllReviewsOfOneRider: getAllReviewsOfOneRider,
    getAllCurrentlyAvailableRider: getAllCurrentlyAvailableRider
};

