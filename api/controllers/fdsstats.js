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

const getMainSummaryData = (req, res, db) => {
    const output = db.query(queryToGetMainSummaryDetails,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result.rows)
            res.status(200).json(result.rows);
        })
}

const queryToGetSummaryDetailsByCustomer =
    "WITH totalOrdersPerCustomerPerMonthYear as (\n" +
    "\tselect EXTRACT(MONTH FROM order_placed) as month, EXTRACT(YEAR FROM order_placed) as year, cid, count(*) as numOfOrders, sum(cart_fee + delivery_fee - discount_amount) as totalCost\n" +
    "\tfrom Orders\n" +
    "\tgroup by (month, year, cid)\n" +
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
    "SELECT month, year, cname as custid, numoforders as totalorders, totalcost\n" +
    "FROM totalOrdersPerCustomerPerMonthYear JOIN Customers USING (cid)\n" +
    "ORDER BY year desc, month desc\n"

const getSummaryDetailsByCustomer = (req, res, db) => {
    const output = db.query(queryToGetSummaryDetailsByCustomer,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result.rows)
            res.status(200).json(result.rows);
        })
}

const queryToGetSummaryDetailsByArea = "WITH currentDateHour as (\n" +
    "\tSELECT DISTINCT now()::timestamp::date as date, EXTRACT(hour FROM now()::timestamp) as hour \n" +
    "\tFROM month\n" +
    "), preprocessDateHour as (\n" +
    "\tSELECT (now()::timestamp - (interval '1h') * h1.hour) as relevantDates\n" +
    "\tFROM DaysInWeek diw1, Hour h1\n" +
    "), relevantDateHour as (\n" +
    "\tSELECT pdh1.relevantDates::date as date, EXTRACT(HOUR FROM pdh1.relevantDates) as hour\n" +
    "\tFROM preprocessDateHour pdh1\n" +
    "), preprocessOrders as (\n" +
    "\tSELECT oid, order_placed::date as date, EXTRACT(HOUR FROM order_placed) as hour, delivery_location_area\n" +
    "\tFROM Orders o1\n" +
    "), finalOrdersSummary as (\n" +
    "\tSELECT date, hour, delivery_location_area as area, count(*)as summary\n" +
    "\tFROM preprocessOrders po1\n" +
    "\tGROUP BY po1.date, po1.hour, po1.delivery_location_area\n" +
    "\t\n" +
    ")\n" +
    "\n" +
    "SELECT rdh2.date, rdh2.hour, a1.area, CASE\n" +
    "\tWHEN EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM finalOrdersSummary fos\n" +
    "\t\tWHERE fos.date = rdh2.date\n" +
    "\t\tAND fos.hour = rdh2.hour\n" +
    "\t\tAND fos.area = a1.area\n" +
    "\t) THEN (\n" +
    "\t\tSELECT fos1.summary\n" +
    "\t\tFROM finalOrdersSummary fos1\n" +
    "\t\tWHERE fos1.date = rdh2.date\n" +
    "\t\tAND fos1.hour = rdh2.hour\n" +
    "\t\tAND fos1.area = a1.area\n" +
    "\t) ELSE 0\n" +
    "\tEND AS totalorders\n" +
    "FROM relevantDateHour rdh2, Areas a1"

const getSummaryDetailsByArea = (req, res, db) => {
    const output = db.query(queryToGetSummaryDetailsByArea,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryToGetRiderSummaryStats =
    "with ordersgroupbyMonthYear as (\n" +
    "select rider_id, count(*) as totalOrders, EXTRACT(MONTH from order_placed) as month, EXTRACT(YEAR from order_placed) as year\n" +
    "from Orders\n" +
    "group by rider_id, EXTRACT(MONTH from order_placed), EXTRACT(YEAR from order_placed)\n" +
    "order by rider_id asc\n" +
    "),\n" +
    "FT_shifts as (\n" +
    "select rider_id, count(*) as totalShifts, EXTRACT(MONTH from sche_date) as month, EXTRACT(YEAR from sche_date) as year\n" +
    "from Riders r1 natural join Schedules s1 natural join Monthly_Work_Schedule m1 natural join Shifts f1\n" +
    "group by rider_id, EXTRACT(MONTH from sche_date), EXTRACT(YEAR from sche_date)\n" +
    "),\n" +
    "FT_groups as (\n" +
    "select rider_id, totalShifts*8 as totalHours, month, year\n" +
    "from FT_shifts\n" +
    "),\n" +
    "PT_groups as (\n" +
    "select rider_id, sum(duration) as totalHours, EXTRACT(MONTH from sche_date) as month, EXTRACT(YEAR from sche_date) as year\n" +
    "from Riders natural join Schedules natural join Weekly_Work_Schedule\n" +
    "group by rider_id, EXTRACT(MONTH from sche_date), EXTRACT(YEAR from sche_date)\n" +
    "order by rider_id asc\n" +
    "),\n" +
    "FT_PT_groups as(\n" +
    "select *\n" +
    "from FT_groups \n" +
    "union \n" +
    "select * \n" +
    "from PT_groups\n" +
    "),\n" +
    "totalSalary as (\n" +
    "select rider_id, r1.base_salary+sum(rider_bonus) as totalSalary, EXTRACT(MONTH from o1.order_placed) as month, \n" +
    "EXTRACT(YEAR from o1.order_placed) as year\n" +
    "from Riders r1 natural join Orders o1\n" +
    "where r1.rider_id = o1.rider_id\n" +
    "group by rider_id, EXTRACT(MONTH from o1.order_placed), EXTRACT(YEAR from o1.order_placed)\n" +
    "order by rider_id asc\n" +
    "),\n" +
    "deliveryTimeandRatings as (\n" +
    "select rider_id, avg(EXTRACT(MINUTE from (order_delivered-rider_depart_for_rest))) as avgDeliveryTime, count(rider_rating) as numRating, \n" +
    "    avg(rider_rating) as avgRating, EXTRACT(MONTH from order_placed) as month, EXTRACT(YEAR from order_placed) as year\n" +
    "from Riders natural join Orders\n" +
    "group by rider_id, EXTRACT(MONTH from order_placed), EXTRACT(YEAR from order_placed)\n" +
    "order by rider_id asc\n" +
    ")\n" +
    "\n" +
    "select o1.month, o1.year, r1.rname as riderid, totalOrders, totalHours, totalSalary, avgDeliveryTime, numRating, avgRating\n" +
    "from Riders r1 natural join ordersgroupbyMonthYear o1 natural join FT_PT_groups f1 natural join totalSalary \n" +
    "natural join deliveryTimeandRatings\n" +
    ";"

const getRiderSummaryStats  = (req, res, db) => {
    const output = db.query(queryToGetRiderSummaryStats,
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}


module.exports = {
    getMainSummaryData: getMainSummaryData,
    getSummaryDetailsByCustomer: getSummaryDetailsByCustomer,
    getRiderSummaryStats: getRiderSummaryStats,
    getSummaryDetailsByArea: getSummaryDetailsByArea
};





































/*
INSERT INTO Year (year) VALUES (EXTRACT(YEAR FROM now()::timestamp)) ON CONFLICT DO NOTHING;

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
/*
with ordersgroupbyMonthYear as (
select rider_id, count(*) as totalOrders, EXTRACT(MONTH from order_placed) as month, EXTRACT(YEAR from order_placed) as year
from Orders
group by rider_id, EXTRACT(MONTH from order_placed), EXTRACT(YEAR from order_placed)
order by rider_id asc
),
FT_shifts as (
select rider_id, count(*) as totalShifts, EXTRACT(MONTH from sche_date) as month, EXTRACT(YEAR from sche_date) as year
from Riders r1 natural join Schedules s1 natural join Monthly_Work_Schedule m1 natural join Shifts f1
group by rider_id, EXTRACT(MONTH from sche_date), EXTRACT(YEAR from sche_date)
),
FT_groups as (
select rider_id, totalShifts*8 as totalHours, month, year
from FT_shifts
),
PT_groups as (
select rider_id, sum(duration) as totalHours, EXTRACT(MONTH from sche_date) as month, EXTRACT(YEAR from sche_date) as year
from Riders natural join Schedules natural join Weekly_Work_Schedule
group by rider_id, EXTRACT(MONTH from sche_date), EXTRACT(YEAR from sche_date)
order by rider_id asc
),
FT_PT_groups as(
select *
from FT_groups
union
select *
from PT_groups
),
totalSalary as (
select rider_id, r1.base_salary+sum(rider_bonus) as totalSalary, EXTRACT(MONTH from o1.order_placed) as month,
EXTRACT(YEAR from o1.order_placed) as year
from Riders r1 natural join Orders o1
where r1.rider_id = o1.rider_id
group by rider_id, EXTRACT(MONTH from o1.order_placed), EXTRACT(YEAR from o1.order_placed)
order by rider_id asc
),
deliveryTimeandRatings as (
select rider_id, avg(EXTRACT(MINUTE from (order_delivered-rider_depart_for_rest))) as avgDeliveryTime, count(rider_rating) as numRating,
    avg(rider_rating) as avgRating, EXTRACT(MONTH from order_placed) as month, EXTRACT(YEAR from order_placed) as year
from Riders natural join Orders
group by rider_id, EXTRACT(MONTH from order_placed), EXTRACT(YEAR from order_placed)
order by rider_id asc
)

select o1.month, o1.year, r1.rname as riderid, totalOrders, totalHours, totalSalary, avgDeliveryTime, numRating, avgRating
from Riders r1 natural join ordersgroupbyMonthYear o1 natural join FT_PT_groups f1 natural join totalSalary
natural join deliveryTimeandRatings
;
 */