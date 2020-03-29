var express = require('express');

const cust = [
    {id: 1, firstName: 'Abbey'},
    {id: 2, firstname: 'Barry'},
    {id: 3, firstName: 'Chendol'}
];

const getAllCustomerDetails = (req, res) => {
    res.json(cust)
}

const getCustomerDetails = (req, res) => {
    const custUsername = req.params.userName
    
    const outputCustDetails = 
        cust.filter((c) => c.id === parseInt(custUsername))

    res.json(outputCustDetails)
}

module.exports = {
    getAllCustomerDetails: getAllCustomerDetails,
    getCustomerDetails: getCustomerDetails
};