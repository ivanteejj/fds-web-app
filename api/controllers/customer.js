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
    "set credit_card_number = 101\n" +
    "WHERE cid = $1;"

const updateCreditCard = (req, res, db) => {
    const cid = req.body.cid;
    console.log(cid);

    const output = db.query(queryUpdateCC, [cid],
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
    updateCreditCard: updateCreditCard
};