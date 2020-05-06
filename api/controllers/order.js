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
    "\tFROM Promotions\n" +
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



const queryToGetMostPopularByMonth =
    "WITH currentMonthYear as (\n" +
    "\tSELECT DISTINCT EXTRACT(MONTH FROM now()::timestamp) as month, EXTRACT(YEAR FROM now()::timestamp) as year\n" +
    "\tFROM month\n" +
    "), relevantMonthYear as (\n" +
    "\tSELECT month, year\n" +
    "\tFROM Month m1, Year y1\n" +
    "\tWHERE (y1.year, m1.month) <= (\n" +
    "\t\tSELECT year, month\n" +
    "\t\tFROM currentMonthYear\n" +
    "\t)\n" +
    "\tORDER BY year desc, month desc\n" +
    "\t-- can be adjusted to show more months\n" +
    "\tLIMIT 12\n" +
    "), totalOrdersWithFood as (\n" +
    "\tSELECT EXTRACT(MONTH FROM order_delivered) as month, EXTRACT(YEAR FROM order_delivered) as year, fid, fname, sum(quantity) as qty_sold\n" +
    "\tFROM Orders NATURAL JOIN (ShoppingCarts NATURAL JOIN (Food NATURAL JOIN Restaurants))\n" +
    "\tWHERE EXTRACT(MONTH FROM order_delivered) IS NOT NULL\n" +
    "\tAND EXTRACT(YEAR FROM order_delivered) IS NOT NULL\n" +
    "\tAND rid = $1\n" +
    "\tGROUP BY month, year, fid, fname\n" +
    "\tORDER BY qty_sold desc\n" +
    "), totalOrdersPerMonthYear as (\n" +
    "\tselect EXTRACT(MONTH FROM order_placed) as month, EXTRACT(YEAR FROM order_placed) as year, count(*) as totalorders, sum(cart_fee) as totalProfit\n" +
    "\tFROM Orders o1\n" +
    "\tWHERE EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM ShoppingCarts sc1, Food f1\n" +
    "\t\tWHERE o1.oid = sc1.oid\n" +
    "\t\tAND sc1.fid = f1.fid\n" +
    "\t\tAND f1.rid = $1\n" +
    "\t)\n" +
    "\tGROUP BY month, year\n" +
    "), preprocessTOWF as(\n" +
    "\tSELECT month, year, json_agg(json_build_object('fid', fid, 'fname', fname, 'qty_sold', qty_sold)) as cart\n" +
    "\tFROM totalOrdersWithFood\n" +
    "\tGROUP BY month, year\n" +
    ")\n" +
    "\n" +
    "SELECT month, year, totalorders, totalprofit, cart as topfavourites\n" +
    "FROM preprocessTOWF JOIN totalOrdersPerMonthYear USING (month, year)\n"

const getMostPopularByMonth = (req, res, db) => {
    const rid = req.query.rid
    const output = db.query(queryToGetMostPopularByMonth, [rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}








module.exports = {
    getAllOrderDetailsForOrderPage: getAllOrderDetailsForOrderPage,
    getAllOrderDetailsforRestaurantStaffPage: getAllOrderDetailsforRestaurantStaffPage,
    getMostPopularByMonth: getMostPopularByMonth,
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

/*
WITH currentMonthYear as (
	SELECT DISTINCT EXTRACT(MONTH FROM now()::timestamp) as month, EXTRACT(YEAR FROM now()::timestamp) as year
	FROM month
), relevantMonthYear as (
	SELECT month, year
	FROM Month m1, Year y1
	WHERE (y1.year, m1.month) <= (
		SELECT year, month
		FROM currentMonthYear
	)
	ORDER BY year desc, month desc
	-- can be adjusted to show more months
	LIMIT 12
), totalOrdersWithFood as (
	SELECT EXTRACT(MONTH FROM order_delivered) as month, EXTRACT(YEAR FROM order_delivered) as year, fid, fname, sum(quantity) as qty_sold
	FROM Orders NATURAL JOIN (ShoppingCarts NATURAL JOIN (Food NATURAL JOIN Restaurants))
	WHERE EXTRACT(MONTH FROM order_delivered) IS NOT NULL
	AND EXTRACT(YEAR FROM order_delivered) IS NOT NULL
	AND rid = $1
	GROUP BY month, year, fid, fname
	ORDER BY qty_sold desc
), totalOrdersPerMonthYear as (
	select EXTRACT(MONTH FROM order_placed) as month, EXTRACT(YEAR FROM order_placed) as year, count(*) as totalorders, sum(cart_fee) as totalProfit
	FROM Orders o1
	WHERE EXISTS (
		SELECT 1
		FROM ShoppingCarts sc1, Food f1
		WHERE o1.oid = sc1.oid
		AND sc1.fid = f1.fid
		AND f1.rid = $1
	)
	GROUP BY month, year
), preprocessTOWF as(
	SELECT month, year, json_agg(json_build_object('fid', fid, 'fname', fname, 'qty_sold', qty_sold)) as cart
	FROM totalOrdersWithFood
	GROUP BY month, year
)

SELECT month, year, totalorders, totalprofit, cart as topfavourites
FROM preprocessTOWF JOIN totalOrdersPerMonthYear USING (month, year)
 */