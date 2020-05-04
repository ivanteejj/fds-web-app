const generateReviewSkeleton = (order) => {
    return {oid: order.oid, rider: generateRiderReviewSkeleton(order), foodRating: generateFoodReviewSkeleton(order)}
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