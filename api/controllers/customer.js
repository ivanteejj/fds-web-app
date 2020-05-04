var express = require('express');

const getAllRecentDeliveryLocForOnePerson =
    "select delivery_location as address\n" +
    "from Orders join Customers using(cid)\n" +
    "where cid = $1\n" +
    "order by order_placed DESC\n" +
    "limit 5;"

const getRecentDeliveryAddress = (req, res, db) => {
    const cid = req.query.cid;
    console.log(cid);

    const output = db.query(getAllRecentDeliveryLocForOnePerson, [cid],
        (error, result) => {
            if (error) {
                console.log(error)
            }
            console.log(result.rows)
            res.status(200).json(result.rows);
        })
}

const getCustomerDetails = (req, res) => {
    const custUsername = req.params.userName
    
    const outputCustDetails = 
        cust.filter((c) => c.id === parseInt(custUsername))

    res.json(outputCustDetails)
}

module.exports = {
    getRecentDeliveryAddress: getRecentDeliveryAddress,
    getCustomerDetails: getCustomerDetails
};