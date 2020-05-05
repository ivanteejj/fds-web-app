var express = require('express');

const queryForGetAllFood = 
"SELECT r1.rname, r1.rid as rid, f1.fname, f1.fid, f1.price, f1.category, f1.daily_limit as qty_left ,r1.area from Restaurants r1 JOIN Food f1 on r1.rid = f1.rid"

const getAllFood = (req, res, db) => {
    const output = db.query(queryForGetAllFood, 
        (error, results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
    }

// "FROM avg(fr1.rating) food_reviews fr1 WHERE fr1.fid = f1.fid"

const queryForGetFoodFromOneRes = 
"SELECT f1.fid, f1.fname, f1.rid as rid, f1.price, f1.category, f1.daily_limit as qty_left, f1.daily_limit as rating " +
    "FROM Food f1 " +
    "WHERE f1.rid = $1"
const getFoodFromOneRes = (req, res, db) => {
    const rid = req.query.rid;
    console.log(rid);

    const output = db.query(queryForGetFoodFromOneRes, [rid],
        (error, result) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(result.rows);
        })
}

const queryToGetFoodForRestaurantPage =
    "WITH perDayPurchase as (\n" +
    "\tSELECT o1.order_placed, sc1.fid, sc1.quantity\n" +
    "\tFROM Orders o1 NATURAL JOIN ShoppingCarts sc1\n" +
    "\tWHERE DATE(order_placed) >= '18/03/2020' AND DATE(order_placed) < '18/03/2020'::date + INTERVAL '1 DAY'\n" +
    ")\n" +
    "\n" +
    "SELECT f1.fid, f1.fname, f1.rid as rid, f1.price, f1.category, f1.daily_limit, quantity as daily_sold\n" +
    "FROM Food f1, perDayPurchase pdp1\n" +
    "WHERE f1.rid = $1\n" +
    "AND f1.fid = pdp1.fid"
const getFoodForRestaurantPage = (req, res, db) => {
    const rid = req.query.rid;
    console.log("rest_id is");
    console.log(rid);

    const output = db.query(queryToGetFoodForRestaurantPage, [rid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}



module.exports = {
    getAllFood: getAllFood,
    getFoodFromOneRes: getFoodFromOneRes,
    getFoodForRestaurantPage: getFoodForRestaurantPage
};
