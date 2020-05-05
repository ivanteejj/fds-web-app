var express = require('express');
/*
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

const queryToGetAllOrderDetailsForOrderPage = "WITH totalPromotions as (\n" +
    "\tSELECT *\n" +
    "\tFROM Restaurant_Promotions\n" +
    "\tUNION\n" +
    "\tSELECT *, null as rest_id\n" +
    "\tFROM FDS_Promotions\n" +
    "), aggregatedCart as (\n" +
    "\tSELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'fname', fname, 'quantity', quantity ,'price', price)) as cart\n" +
    "\tFROM ((Orders JOIN ShoppingCarts using (oid)) JOIN Food f1 USING (fid)) JOIN Restaurants USING (rid)\n" +
    "\tGROUP BY oid\n" +
    ")\n" +
    "\n" +
    "\n" +
    "SELECT oid, delivery_fee as deliveryfee, cart_fee as cartcost, promo_details_text, discount_amount, payment_method as paymentMode, delivery_location as deliverylocation, rider_id as riderid, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, order_delivered as dt_order_delivered , cart    \n" +
    "FROM (Orders NATURAL JOIN aggregatedCart) LEFT JOIN totalPromotions USING (pid)\n" +
    "WHERE cid = $1"


const getAllOrderDetailsForOrderPage = (req, res, db) => {
    const cid = req.query.cid
    const output = db.query(queryToGetAllOrderDetailsForOrderPage, [cid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
    }


const queryToGetAllOrderDetailsforRestaurantStaffPage =
    "WITH aggregatedCart as (\n" +
    "    SELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'fname', fname, 'quantity', quantity ,'price', price)) as cart\n" +
    "    FROM ((Orders JOIN ShoppingCarts using (oid)) JOIN Food f1 USING (fid)) JOIN Restaurants USING (rid)\n" +
    "    WHERE rid = $1\n" +
    "\tGROUP BY oid\n" +
    ")\n" +
    "\n" +
    "SELECT oid, rname as riderid, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, order_delivered as dt_order_delivered, cart \n" +
    "FROM (Orders o1 JOIN Riders USING (rider_id)) JOIN aggregatedCart USING (oid)\n" +
    "WHERE rider_depart_for_delivery_location ISNULL"


const getAllOrderDetailsforRestaurantStaffPage = (req, res, db) => {
    const rid = req.query.rid
    const output = db.query(queryToGetAllOrderDetailsforRestaurantStaffPage, [rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}




    module.exports = {
    getAllOrderDetailsForOrderPage: getAllOrderDetailsForOrderPage,
    getAllOrderDetailsforRestaurantStaffPage: getAllOrderDetailsforRestaurantStaffPage

};














/*
WITH aggregatedCart as (
    SELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'fname', fname, 'quantity', quantity ,'price', price)) as cart
    FROM ((Orders JOIN ShoppingCarts using (oid)) JOIN Food f1 USING (fid)) JOIN Restaurants USING (rid)
	WHERE rid = 1
    GROUP BY oid
)

SELECT oid, rname as rid, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, order_delivered as dt_order_delivered, cart
FROM (Orders o1 JOIN Riders USING (rider_id)) JOIN aggregatedCart USING (oid)

 */