var express = require('express');

const queryForGetAllFood = 
"SELECT r1.rname, r1.rest_id as rid, f1.fname, f1.fid, f1.price, f1.category, f1.daily_limit as qty_left ,r1.area from Restaurants r1 JOIN Food f1 on r1.rest_id = f1.rest_id"

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
"SELECT f1.fid, f1.fname, f1.rest_id as rid, f1.price, f1.category, f1.daily_limit as qty_left, f1.daily_limit as rating FROM Food f1 WHERE f1.rest_id = $1"
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



module.exports = {
    getAllFood: getAllFood,
    getFoodFromOneRes: getFoodFromOneRes
};
