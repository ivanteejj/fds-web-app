var express = require('express');
/*
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
*/

const queryToGetAllOrderDetailsForOrderPage =
    "SELECT * FROM Orders o1 " +
    "WHERE o1.cid = 1 ;"


/*
"SELECT o1.oid, o1.total_cost as totalCost, o1.delivery_fee as deliveryFee, (o1.total_cost - o1.delivery_fee) as cartCost, o1.payment_method as paymentMode  " +
"FROM Orders o1 " +
"WHERE o1.cid = 1 ;"

 */


const getAllOrderDetailsForOrderPage = (req, res, db) => {
    const output = db.query(queryToGetAllOrderDetailsForOrderPage,
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
    }    

module.exports = {
    getAllOrderDetailsForOrderPage: getAllOrderDetailsForOrderPage,
};

