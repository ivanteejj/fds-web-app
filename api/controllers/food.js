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
    "    SELECT sc1.fid, sum(sc1.quantity) as quantity\n" +
    "    FROM Orders o1 NATURAL JOIN ShoppingCarts sc1\n" +
    "\tWHERE DATE(order_placed) >= CURRENT_DATE AND DATE(order_placed) < CURRENT_DATE::DATE + INTERVAL '1 DAY'\n" +
    "\tGROUP BY fid\n" +
    ")\n" +
    "\t\n" +
    "    SELECT f1.fid, f1.fname, f1.rid as rid, f1.price, f1.category, f1.daily_limit, COALESCE(quantity, 0) as daily_sold\n" +
    "    FROM Food f1 LEFT JOIN perDayPurchase USING (fid)\n" +
    "    WHERE f1.rid = $1"

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

const queryUpdateFood =
    "UPDATE food \n" +
    "SET fname = $1,\n" +
    "\tprice = $2,\n" +
    "\tdaily_limit = $3,\n" +
    "\tcategory = $4\n" +
    "WHERE\n" +
    "\tfid = $5;"
const updateFoodForRestaurantPage = (req, res, db) => {
    const fid = req.query.fid;
    console.log(fid);

    const output = db.query(queryUpdateFood, [req.query.fname, req.query.price, req.query.daily_limit, req.query.category, fid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryDeleteFood =
    "DELETE FROM food\n" +
    "WHERE fid = $1;"
const deleteFoodForRestaurantPage = (req, res, db) => {
    const fid = req.query.fid;
    console.log(fid);

    const output = db.query(queryDeleteFood, [fid],
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
    getFoodForRestaurantPage: getFoodForRestaurantPage,

    updateFoodForRestaurantPage: updateFoodForRestaurantPage,
    deleteFoodForRestaurantPage: deleteFoodForRestaurantPage
};




/*
WITH perDayPurchase as (
    SELECT sc1.fid, sum(sc1.quantity) as quantity
    FROM Orders o1 NATURAL JOIN ShoppingCarts sc1
	WHERE DATE(order_placed) >= CURRENT_DATE AND DATE(order_placed) < CURRENT_DATE::DATE + INTERVAL '1 DAY'
	GROUP BY fid
)

    SELECT f1.fid, f1.fname, f1.rid as rid, f1.price, f1.category, f1.daily_limit, COALESCE(quantity, 0) as daily_sold
    FROM Food f1 LEFT JOIN perDayPurchase USING (fid)
    WHERE f1.rid = 1
 */