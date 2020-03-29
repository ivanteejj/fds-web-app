var express = require('express');

const allFood = [
    { rname: "North Restaurant", rid: 1, fname: "chicken wing", fid: 1, price: 6, category: "Fast Food", qty_left: 10 },
    { rname: "North Restaurant", rid: 1, fname: "french fry", fid: 2, price: 7, category: "Fast Food", qty_left: 11 },
    { rname: "North Restaurant", rid: 1, fname: "chicken burger", fid: 3, price: 5, category: "Fast Food", qty_left: 20 },
    { rname: "South Restaurant", rid: 2, fname: "kimchi", fid: 11, price: 8, category: "Korean", qty_left: 20 },
    { rname: "South Restaurant", rid: 2, fname: "patbingsoo", fid: 12, price: 9, category: "Korean", qty_left: 20 },
    { rname: "South Restaurant", rid: 2, fname: "tofu stew", fid: 13, price: 10, category: "Korean", qty_left: 20 },
];

const getAllFood = (req, res) => {
    res.json(allFood)
}

module.exports = {
    getAllFood: getAllFood,
};
