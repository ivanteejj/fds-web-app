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
    "\tSELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'fname', sc1.fname, 'quantity', quantity ,'price', price)) as cart\n" +
    "\tFROM ((Orders JOIN ShoppingCarts sc1 using (oid)) JOIN Food f1 USING (fid)) JOIN Restaurants USING (rid)\n" +
    "\tGROUP BY oid\n" +
    "), aggregatedFoodReviews as (\n" +
    "\tSELECT oid, json_agg(json_build_object('fid', fid,'fname', fname, 'review', remark, 'rating', ratings)) as foodrating\n" +
    "\tFROM Orders JOIN (Food_Reviews JOIN Food using (fid)) USING (oid)\n" +
    "\tGROUP BY oid\n" +
    ")\n" +
    "\n" +
    "SELECT oid, delivery_fee as deliveryfee, cart_fee as cartcost, promo_details_text, discount_amount, payment_method as paymentMode, delivery_location as deliverylocation, rider_id as riderid, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, order_delivered as dt_order_delivered , cart, rider_id as riderid, rider_review, rider_rating, foodrating\n" +
    "FROM (Orders NATURAL JOIN aggregatedCart) LEFT JOIN totalPromotions USING (pid) LEFT JOIN aggregatedFoodReviews USING (oid)\n" +
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
    "    SELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'address', address, 'fname', fname, 'quantity', quantity ,'price', price)) as cart\n" +
    "    FROM Orders NATURAL JOIN ShoppingCarts NATURAL JOIN Food NATURAL JOIN Restaurants" +
    "    WHERE rid = $1\n" +
    "\tGROUP BY oid\n" +
    ")\n" +
    "\n" +
    "SELECT o1.oid, o1.cart_fee as totalcost, payment_method as paymentmode, c1.cname as custid, delivery_location as deliverylocation, rider_id, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, order_delivered as dt_order_delivered, cart\n" +
    "FROM orders o1 NATURAL JOIN aggregatedCart, Customers c1\n" +
    "WHERE o1.cid = c1.cid AND order_delivered IS NULL"



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
    "\tSELECT EXTRACT(MONTH FROM order_delivered) as month, EXTRACT(YEAR FROM order_delivered) as year, fid, sc1.fname, sum(quantity) as qty_sold\n" +
    "\tFROM Orders NATURAL JOIN (ShoppingCarts sc1 NATURAL JOIN (Food NATURAL JOIN Restaurants))\n" +
    "\tWHERE EXTRACT(MONTH FROM order_delivered) IS NOT NULL\n" +
    "\tAND EXTRACT(YEAR FROM order_delivered) IS NOT NULL\n" +
    "\tAND rid = $1\n" +
    "\tGROUP BY month, year, fid, sc1.fname\n" +
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

const queryToGetOngoingOrdersForOneRider =
    "with aggregatedCart as (\n" +
    "SELECT oid, json_agg(json_build_object('fid', fid,'rid', rid, 'rname', rname, 'address', address, 'fname', fname, 'quantity', quantity ,'price', price)) as cart\n" +
    "FROM Orders natural join ShoppingCarts natural join Food natural join Restaurants\n" +
    "group by oid\n" +
    ")\n" +
    "\n" +
    "select o1.oid, o1.cart_fee as totalcost, payment_method as paymentmode, c1.cname as custid, delivery_location as deliverylocation, \n" +
    "rname as rider_id, order_placed as dt_order_placed, rider_depart_for_rest as dt_rider_departs, \n" +
    "rider_arrive_rest as dt_rider_arrives_rest, rider_depart_for_delivery_location as dt_rider_departs_rest, \n" +
    "order_delivered as dt_order_delivered, cart\n" +
    "from orders o1 natural join aggregatedCart natural join riders, Customers c1\n" +
    "where o1.cid = c1.cid and order_delivered IS NULL\n" +
    "and rider_id = $1\n" +
    ";"

const getOngoingOrderForOneRider = (req, res, db) => {
    const rider_id = req.query.rider_id
    const output = db.query(queryToGetOngoingOrdersForOneRider, [rider_id],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToUpdateRiderDepartForRest =
    "UPDATE Orders\n" +
    "SET rider_depart_for_rest = now()::timestamp\n" +
    "WHERE oid = $1"

const updateRiderDepartForRest = (req, res, db) => {
    const oid = req.body.oid
    const output = db.query(queryToUpdateRiderDepartForRest, [oid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToUpdateRiderArriveRest =
    "UPDATE Orders\n" +
    "SET rider_arrive_rest = now()::timestamp\n" +
    "WHERE oid = $1"

const updateRiderArriveRest = (req, res, db) => {
    const oid = req.body.oid
    const output = db.query(queryToUpdateRiderArriveRest, [oid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToUpdateRiderDepartForDeliveryLoc =
    "UPDATE Orders\n" +
    "SET rider_depart_for_delivery_location = now()::timestamp\n" +
    "WHERE oid = $1"

const updateRiderDepartForDeliveryLoc = (req, res, db) => {
    const oid = req.body.oid
    const output = db.query(queryToUpdateRiderDepartForDeliveryLoc, [oid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToUpdateOrderDelivered =
    "UPDATE Orders\n" +
    "SET order_delivered = now()::timestamp\n" +
    "WHERE oid = $1"

const updateOrderDelivered = (req, res, db) => {
    const oid = req.body.oid
    const output = db.query(queryToUpdateOrderDelivered, [oid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToAddAnOrder =
    "INSERT INTO Orders (order_placed, payment_method, cart_fee, delivery_fee, rider_bonus, discount_amount, delivery_location, delivery_location_area, rider_id, cid, pid)\n" +
    "VALUES (now()::timestamp, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"

const addAnOrder = (req, res, db) => {
    const payment_method = req.body.payment_method
    console.log("Payment method is")
    console.log(payment_method)
    const cart_fee = req.body.cart_fee
    console.log("Cart fee is")
    console.log(cart_fee)
    const delivery_fee = req.body.delivery_fee
    const rider_bonus = req.body.rider_bonus
    const discount_amount = req.body.discount_amount
    const delivery_location = req.body.delivery_location
    const delivery_location_area = req.body.delivery_location_area
    const rider_id = req.body.rider_id
    const cid = req.body.cid
    const pid = req.body.pid

    const output = db.query(queryToAddAnOrder, [payment_method, cart_fee, delivery_fee, rider_bonus, discount_amount, delivery_location, delivery_location_area, rider_id, cid, pid],
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
    getOngoingOrderForOneRider: getOngoingOrderForOneRider,
    updateRiderDepartForRest: updateRiderDepartForRest,
    updateRiderArriveRest: updateRiderArriveRest,
    updateRiderDepartForDeliveryLoc: updateRiderDepartForDeliveryLoc,
    updateOrderDelivered: updateOrderDelivered,
    addAnOrder: addAnOrder
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