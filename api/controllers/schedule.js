var express = require('express');

const querySetUpSchedule =
    "insert into schedules(rider_id)\n" +
    "values ($1)\n" +
    "returning sid;"
const setUpSchedule = (req, res, db) => {
    const rider_id = req.body.rider_id
    const output = db.query(querySetUpSchedule, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryInsertWWS =
    "insert into weekly_work_schedule\n" +
    "select * from json_populate_recordset(null::weekly_work_schedule, $1);"
const insertWWS = (req, res, db) => {
    const output = db.query(queryInsertWWS, [req.body.table],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

module.exports = {
    setUpSchedule: setUpSchedule,
    insertWWS: insertWWS
};