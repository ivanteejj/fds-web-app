var express = require('express');

const queryToGetAllReviewsOfOneRider =
    "select rname as riderid, rider_rating, rider_review, order_delivered\n" +
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

module.exports = {
    getAllReviewsOfOneRider: getAllReviewsOfOneRider,
};

