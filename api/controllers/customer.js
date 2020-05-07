var express = require('express');

const getAllRecentDeliveryLocForOnePerson =
"WITH recentDuplicatedDeliveryAddresses as (\n" +
    "\tselect delivery_location as address, delivery_location_area as area\n" +
    "    from Orders join Customers using(cid)\n" +
    "    where cid = $1\n" +
    "    order by order_placed DESC\n" +
    ")\n" +
    "\n" +
    "SELECT DISTINCT address, area\n" +
    "FROM recentDuplicatedDeliveryAddresses\n" +
    "limit 5;"

const getRecentDeliveryAddress = (req, res, db) => {
    const cid = req.query.cid;
    console.log(cid);

    const output = db.query(getAllRecentDeliveryLocForOnePerson, [cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryToGetOneCustomersDetails = "SELECT * FROM Customers WHERE cid = $1"

const getOneCustomersDetails = (req, res, db) => {
    const cid = req.query.cid;
    console.log(cid);

    const output = db.query(queryToGetOneCustomersDetails, [cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryUpdateCC =
    "UPDATE customers \n" +
    "set credit_card_number = $1\n" +
    "WHERE cid = $2;"

const updateCreditCard = (req, res, db) => {
    const cid = req.body.cid;
    console.log(cid);

    const output = db.query(queryUpdateCC, [req.body.credit_card_number, cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryUpdateCustPoints =
    "UPDATE customers \n" +
    "set points = $1\n" +
    "WHERE cid = $2;"

const updateCustPoints = (req, res, db) => {
    const cid = req.body.cid;
    console.log(cid);

    const output = db.query(queryUpdateCustPoints, [req.body.points, cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const queryGetCustPoints =
    "select points from customers where cid = $1;"

const getCustPoints = (req, res, db) => {
    const cid = req.query.cid;
    console.log(cid);

    const output = db.query(queryGetCustPoints, [cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const connectToCustomerAcc =
    "select username\n" +
    "from accounts natural join customers\n" +
    "where username = $1 and password = $2;"
const connectCust = (req, res, db) => {
    const userid = req.query.userid;
    const pwd = req.query.password;

    const output = db.query(connectToCustomerAcc, [userid, pwd],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const connectToStaffAcc =
    "select username, rid\n" +
    "    from accounts natural join staff\n" +
    "\twhere username = $1 and password = $2"
const connectStaff = (req, res, db) => {
    const userid = req.query.userid;
    const pwd = req.query.password;

    const output = db.query(connectToStaffAcc, [userid, pwd],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

const connectToRiderAcc =
    "select username\n" +
    "    from accounts natural join riders\n" +
    "\twhere username = $1 and password = $2"
const connectRider = (req, res, db) => {
    const userid = req.query.userid;
    const pwd = req.query.password;

    const output = db.query(connectToRiderAcc, [userid, pwd],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            res.status(200).json(result.rows);
        })
}

module.exports = {
    getRecentDeliveryAddress: getRecentDeliveryAddress,
    getOneCustomersDetails: getOneCustomersDetails,
    updateCreditCard: updateCreditCard,
    updateCustPoints: updateCustPoints,
    getCustPoints: getCustPoints,

    connectCust: connectCust,
    connectRider: connectRider,
    connectStaff: connectStaff

};