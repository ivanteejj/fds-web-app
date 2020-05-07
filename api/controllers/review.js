var express = require('express');

const queryAddRiderReview =
    "UPDATE ORDERS\n" +
    "\tSET rider_review = $1,\n" +
    "\t\trider_rating = $2\n" +
    "\tWHERE oid = $3;"
const addRiderReviewByCustomerPage = (req, res, db) => {
    let oid = req.body.oid;
    console.log("order_id is");
    console.log(req.body.oid);
    const output = db.query(queryAddRiderReview,
        [req.body.remarks, req.body.ratings, oid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryAddFoodReview =
    "INSERT INTO food_reviews (fid, oid, remark, ratings) \n" +
    "VALUES ($1, $2, $3, $4);"
const addFoodReviewByCustomerPage = (req, res, db) => {
    let oid = req.body.oid;
    console.log("order_id is");
    console.log(req.body.oid);
    const output = db.query(queryAddFoodReview,
        [req.body.fid, oid, req.body.remarks, req.body.ratings],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

module.exports = {
    addRiderReviewByCustomerPage: addRiderReviewByCustomerPage,
    addFoodReviewByCustomerPage: addFoodReviewByCustomerPage
};