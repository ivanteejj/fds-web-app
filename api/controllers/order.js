var express = require('express');

const queryForGetOneRestDetails = "SELECT r1.rest_id as rid, r1.rname, r1.area, r1.address FROM Restaurants r1 WHERE r1.rest_id = $1"

const getOneRestDetails = (req, res, db) => {
    const rid = req.query.rid;
    console.log(rid);

    const output = db.query(queryForGetOneRestDetails, [rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
    }


const queryForGetAllRestDataForHomePage = "SELECT r1.rname, r1.rest_id as rid, r1.area, r1.address, f1.fname, f1.fid, f1.price, f1.category, f1.daily_limit FROM Restaurants r1 JOIN food f1 ON r1.rest_id = f1.rest_id"
const getAllRestDataForHomePage = (req, res, db) => {
    const output = db.query(queryForGetAllRestDataForHomePage,
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
    }    

module.exports = {
    getOneRestDetails: getOneRestDetails,
    getAllRestDataForHomePage: getAllRestDataForHomePage,
};

