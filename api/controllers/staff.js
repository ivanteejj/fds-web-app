var express = require('express');


const queryToGetMainSummaryDetails =
    "WITH totalOrdersPerMonthYear as (\n" +
    "\tselect EXTRACT(MONTH FROM order_placed) as month, EXTRACT(YEAR FROM order_placed) as year, count(*) as numOfOrders, sum(cart_fee + delivery_fee - discount_amount) as totalCost\n" +
    "\tfrom Orders\n" +
    "\tgroup by (month, year)\n" +
    "), totalCustomersPerMonthYear as (\n" +
    "\tselect EXTRACT(MONTH FROM join_date) as month, EXTRACT(YEAR FROM join_date) as year, count(*) as numOfCustomers\n" +
    "\tfrom Customers\n" +
    "\tgroup by (month, year)\n" +
    "), currentMonthYear as (\n" +
    "\tSELECT DISTINCT EXTRACT(MONTH FROM now()::timestamp) as month, EXTRACT(YEAR FROM now()::timestamp) as year \n" +
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
    ")\n" +
    "\n" +
    "SELECT rmy1.month, rmy1.year, \n" +
    "\tCASE\n" +
    "\tWHEN EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM totalCustomersPerMonthYear tcpmy1\n" +
    "\t\tWHERE tcpmy1.month = rmy1.month\n" +
    "\t\tAND tcpmy1.year = rmy1.year\n" +
    "\t) THEN (\n" +
    "\t\tSELECT numOfCustomers\n" +
    "\t\tFROM totalCustomersPerMonthYear tcpmy2\n" +
    "\t\tWHERE tcpmy2.month = rmy1.month\n" +
    "\t\tAND tcpmy2.year = rmy1.year\n" +
    "\t) ELSE 0\n" +
    "\tEND as totalnewcustomers,\n" +
    "\tCASE\n" +
    "\tWHEN EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM totalOrdersPerMonthYear topmy1\n" +
    "\t\tWHERE topmy1.month = rmy1.month\n" +
    "\t\tAND topmy1.year = rmy1.year\n" +
    "\t) THEN (\n" +
    "\t\tSELECT numOfOrders\n" +
    "\t\tFROM totalOrdersPerMonthYear topmy2\n" +
    "\t\tWHERE topmy2.month = rmy1.month\n" +
    "\t\tAND topmy2.year = rmy1.year\n" +
    "\t) ELSE 0\n" +
    "\tEND as totalorders,\n" +
    "\tCASE\n" +
    "\t\tWHEN EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM totalOrdersPerMonthYear topmy1\n" +
    "\t\tWHERE topmy1.month = rmy1.month\n" +
    "\t\tAND topmy1.year = rmy1.year\n" +
    "\t) THEN (\n" +
    "\t\tSELECT totalCost\n" +
    "\t\tFROM totalOrdersPerMonthYear topmy2\n" +
    "\t\tWHERE topmy2.month = rmy1.month\n" +
    "\t\tAND topmy2.year = rmy1.year\n" +
    "\t) ELSE 0\n" +
    "\tEND as totalcost\n" +
    "FROM relevantMonthYear rmy1"

const getMainStaffSummaryData = (req, res, db) => {
    const output = db.query(queryToGetMainSummaryDetails,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result.rows)
            res.status(200).json(result.rows);
        })
}


module.exports = {
    getMainStaffSummaryData: getMainStaffSummaryData,
};




/*
WITH totalOrdersPerMonthYear as (
	select EXTRACT(MONTH FROM order_placed) as month, EXTRACT(YEAR FROM order_placed) as year, count(*) as numOfOrders, sum(cart_fee + delivery_fee - discount_amount) as totalCost
   	from Orders
    group by (month, year)
), totalCustomersPerMonthYear as (
    select EXTRACT(MONTH FROM join_date) as month, EXTRACT(YEAR FROM join_date) as year, count(*) as numOfCustomers
    from Customers
    group by (month, year)
), currentMonthYear as (
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
 )


    SELECT rmy1.month, rmy1.year,
    CASE
    WHEN EXISTS (
		SELECT 1
		FROM totalCustomersPerMonthYear tcpmy1
		WHERE tcpmy1.month = rmy1.month
		AND tcpmy1.year = rmy1.year
    ) THEN (
		SELECT numOfCustomers
		FROM totalCustomersPerMonthYear tcpmy2
		WHERE tcpmy2.month = rmy1.month
		AND tcpmy2.year = rmy1.year
	) ELSE 0
    END as totalnewcustomers,
    CASE
    WHEN EXISTS (
		SELECT 1
		FROM totalOrdersPerMonthYear topmy1
		WHERE topmy1.month = rmy1.month
		AND topmy1.year = rmy1.year
    ) THEN (
		SELECT numOfOrders
		FROM totalOrdersPerMonthYear topmy2
		WHERE topmy2.month = rmy1.month
		AND topmy2.year = rmy1.year
    ) ELSE 0
    END as totalorders,
    CASE
    WHEN EXISTS (
		SELECT 1
		FROM totalOrdersPerMonthYear topmy1
		WHERE topmy1.month = rmy1.month
		AND topmy1.year = rmy1.year
    ) THEN (
		SELECT totalCost
		FROM totalOrdersPerMonthYear topmy2
		WHERE topmy2.month = rmy1.month
		AND topmy2.year = rmy1.year
    ) ELSE 0
    END as totalcost
    FROM relevantMonthYear rmy1
 */

