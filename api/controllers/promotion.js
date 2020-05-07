var express = require('express');

const queryToGetAllRelevantPromos =
    "    WITH numUsedPreProcess as (\n" +
    "    SELECT pid, \n" +
    "\t\tCASE\n" +
    "    WHEN EXISTS (\n" +
    "\t\tSELECT 1\n" +
    "\t\tFROM Orders o1\n" +
    "\t\tWHERE o1.pid = p1.pid\n" +
    "    ) THEN (\n" +
    "\t\tSELECT count(*)\n" +
    "\t\tFROM Orders o2\n" +
    "\t\tWHERE o2.pid = p1.pid\n" +
    "    ) ELSE 0\n" +
    "\tEND AS num\n" +
    "\tFROM Promotions p1\n" +
    "    ), relevantPromos as (\n" +
    "    SELECT pid, promo_cat as type, promo_rate as disc, promo_type as disc_type, promo_details_text as details, rid\n" +
    "    FROM Promotions fp1\n" +
    "    WHERE now()::timestamp BETWEEN start_datetime AND end_datetime\n" +
    "    AND promo_max_num_redemption IS NULL \n" +
    "    OR (promo_max_num_redemption IS NOT NULL \n" +
    "    AND promo_max_num_redemption > (\n" +
    "\t\tSELECT nupp2.num\n" +
    "\t\tFROM numUsedPreProcess nupp2\n" +
    "\t\tWHERE nupp2.pid = fp1.pid\n" +
    "    )))\n" +
    "    \n" +
    "\tSELECT type, disc, disc_type, details \n" +
    "    FROM relevantPromos rp1\n" +
    "    WHERE rp1.rid = $1\n" +
    "\tUNION\n" +
    "\tSELECT type, disc, disc_type, details \n" +
    "    FROM relevantPromos rp1\n" +
    "    WHERE rp1.rid ISNULL"
const getAllRelevantPromos = (req, res, db) => {
    const rid = req.query.rid;
    console.log(rid);
    const output = db.query(queryToGetAllRelevantPromos, [rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetAllPromoStatisticsForStaffPage =
    "with unionPromo as (\n" +
    "select *\n" +
    "from Promotions\n" +
    "WHERE rid = $1\n" +
    "),\n" +
    "usePromo as (\n" +
    "select u1.pid, COALESCE(count(*), 0) as totalCount, EXTRACT(day from (end_datetime-start_datetime)) as promoDuration\n" +
    "from unionPromo u1 left join orders o1\n" +
    "on u1.pid = o1.pid\n" +
    "group by u1.pid, start_datetime, end_datetime\n" +
    ")\n" +
    "select u2.pid, promo_details_text,start_datetime, end_datetime, promo_type, promo_cat, promoDuration as duration, totalCount/promoDuration as avgOrders,\n" +
    "promo_min_cost, promo_rate, promo_max_discount_limit, promo_max_num_redemption\n" +
    "from usePromo u2, unionPromo z1\n" +
    "where u2.pid = z1.pid"

const getAllPromoStatisticsForStaffPage = (req, res, db) => {
    const rid = req.query.rid;
    console.log(rid);
    const output = db.query(queryToGetAllPromoStatisticsForStaffPage, [rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToGetAllPromoStatisticsForFDSManagerPage =
    "with usePromo as (\n" +
    "select u1.pid, COALESCE(count(*), 0) as totalCount, EXTRACT(day from (end_datetime-start_datetime)) as promoDuration\n" +
    "from Promotions u1 left join orders o1\n" +
    "on u1.pid = o1.pid\n" +
    "group by u1.pid, start_datetime, end_datetime\n" +
    ")\n" +
    "select u2.pid, promo_details_text,start_datetime, end_datetime, promo_type, promo_cat, promoDuration as duration, " +
    "totalCount / (CASE WHEN promoDuration < 1 THEN 1 ELSE promoDuration END) as avgOrders,\n" +
    "promo_min_cost, promo_rate, promo_max_discount_limit, promo_max_num_redemption\n" +
    "from usePromo u2, Promotions z1\n" +
    "where u2.pid = z1.pid\n" +
    "and z1.rid ISNULL"

const getAllPromoStatisticsForFDSManagerPage = (req, res, db) => {
    const output = db.query(queryToGetAllPromoStatisticsForFDSManagerPage,
        (error,  results) => {
            if (error) {
                console.log(error)
            }

            res.status(200).json(results.rows)
        })
}

const queryToAddNewPromotion =
    "INSERT INTO Promotions (promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rid)\n" +
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);\n"
const addNewPromotion = (req, res, db) => {
    const promo_rate = req.body.promo_rate
    const promo_type = req.body.promo_type
    const promo_cat = req.body.promo_cat
    const start_datetime = req.body.start_datetime
    const end_datetime = req.body.end_datetime
    const promo_min_cost = req.body.promo_min_cost
    const promo_max_discount_limit = req.body.promo_max_discount_limit
    const promo_max_num_redemption = req.body.promo_max_num_redemption
    const promo_details_text = req.body.promo_details_text
    const rid =  req.body.rid
    const output = db.query(queryToAddNewPromotion, [promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, rid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(results.rows)
        })
}

const queryToEditPromotion =
    "UPDATE Promotions \n" +
    "SET promo_rate = $1, promo_type = $2, promo_cat = $3, start_datetime = $4, end_datetime = $5,\n" +
    "promo_min_cost = $6, promo_max_discount_limit = $7, promo_max_num_redemption = $8, promo_details_text = $9\n" +
    "WHERE\n" +
    "\tpid = $10;"
const editPromotion = (req, res, db) => {
    const promo_rate = req.body.promo_rate
    const promo_type = req.body.promo_type
    const promo_cat = req.body.promo_cat
    const start_datetime = req.body.start_datetime
    const end_datetime = req.body.end_datetime
    const promo_min_cost = req.body.promo_min_cost
    const promo_max_discount_limit = req.body.promo_max_discount_limit
    const promo_max_num_redemption = req.body.promo_max_num_redemption
    const promo_details_text = req.body.promo_details_text
    const pid =  req.body.pid
    const output = db.query(queryToEditPromotion,
        [promo_rate, promo_type, promo_cat, start_datetime, end_datetime, promo_min_cost, promo_max_discount_limit, promo_max_num_redemption, promo_details_text, pid],
        (error,  results) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(results.rows)
        })
}

const queryToDeletePromotion =
    "delete from promotions where pid = $1;"
const deletePromotion = (req, res, db) => {
    const pid = req.query.pid;
    console.log("" +pid);

    const output = db.query(queryToDeletePromotion, [pid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

module.exports = {
    addNewPromotion: addNewPromotion,
    editPromotion: editPromotion,
    deletePromotion: deletePromotion,
    getAllRelevantPromos: getAllRelevantPromos,
    getAllPromoStatisticsForStaffPage: getAllPromoStatisticsForStaffPage,
    getAllPromoStatisticsForFDSManagerPage: getAllPromoStatisticsForFDSManagerPage
};































/*
    WITH numUsedPreProcess as (
    SELECT pid,
		CASE
    WHEN EXISTS (
		SELECT 1
		FROM Orders o1
		WHERE o1.pid = p1.pid
    ) THEN (
		SELECT count(*)
		FROM Orders o2
		WHERE o2.pid = p1.pid
    ) ELSE 0
	END AS num
	FROM Promotions p1
    ), relevantPromos as (
    SELECT pid, promo_cat as type, promo_rate as disc, promo_type as disc_type, promo_details_text as details, rid
    FROM Promotions fp1
    WHERE now()::timestamp BETWEEN start_datetime AND end_datetime
    AND promo_max_num_redemption IS NULL
    OR (promo_max_num_redemption IS NOT NULL
    AND promo_max_num_redemption > (
		SELECT nupp2.num
		FROM numUsedPreProcess nupp2
		WHERE nupp2.pid = fp1.pid
    )))

	SELECT type, disc, disc_type, details
    FROM relevantPromos rp1
    WHERE rp1.rid = 4
	UNION
	SELECT type, disc, disc_type, details
    FROM relevantPromos rp1
    WHERE rp1.rid ISNULL
 */