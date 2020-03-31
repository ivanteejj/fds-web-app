import React from "react"

const generateReviewSkeleton = (order) => {
    return {rider: generateRiderReviewSkeleton(order), foodRating: generateFoodReviewSkeleton(order)}
}

const generateRiderReviewSkeleton = (order) => {
    return {riderid: order.riderid, rating: 0, review: ""}
}

const generateFoodReviewSkeleton = (order) => {
    return order.cart.map(item => {
        return {fid: item.fid, fname: item.fname, rating: 0, review: ""}
    })
}

export default generateReviewSkeleton