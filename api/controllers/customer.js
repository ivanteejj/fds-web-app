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