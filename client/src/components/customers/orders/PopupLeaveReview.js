import React, {useState, useEffect } from "react";
import {
    Form,
    TextArea,
    Rating,
    Divider,
    Button,
    Icon
} from "semantic-ui-react";
import "./Popup.css"

export default function PopupLeaveReview({hidePopup, review, submitReview}) {
    const [reviews, setReviews] = useState(review)
    const [count, setCount] = useState(1)

    const updateFoodReview = (type, value, fid) => {
        if (type === "rating") {
            setReviews({...reviews,
                foodRating: reviews.foodRating.map(item => item.fid === fid ? {...item, rating: value}: item)
            })
        } else if (type === "review") {
            setReviews({...reviews,
                foodRating: reviews.foodRating.map(item => item.fid === fid ? {...item, review: value} : item)
            })
        }
    }

    useEffect(() => {
        setCount(
            reviews.foodRating.filter(item => item.rating < 1 || item.review === "").length +
            (reviews.rider.rating < 1 || reviews.rider.review === "" ? 1 : 0)
        )
    }, [reviews.foodRating, reviews.rider.rating, reviews.rider.review])

    const updateRiderReview = (type, value) => {
        if (type === "rating") {
            setReviews({...reviews,
                rider: {...reviews.rider, rating: value}
            })
        } else if (type === "review") {
            setReviews({...reviews,
                rider: {...reviews.rider, review: value}
            })
        }
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => hidePopup("leaveReview", false)}>x</span>
                <>
                    <Form>
                        <h1>Share with us your order experience</h1>

                        <Divider/>
                        <h2>Rider Review</h2>
                        <>
                            <h3><Icon name='user'/> {`${review.rider.riderid}`}</h3>
                            <Form.Field>
                                <Rating size='large' defaultRating={0} maxRating={5} color={"yellow"}
                                        onRate={(e, {rating}) => {updateRiderReview("rating", rating)}}
                                />
                            </Form.Field>

                            <Form.Field>
                                <TextArea
                                    placeholder={`Type your review on ${review.rider.riderid}'s performance here`}
                                    onChange={(e) => {updateRiderReview("review", e.target.value)}}
                                />
                            </Form.Field>
                        </>

                        <Divider/>
                        <h2>Food Review</h2>
                        {reviews.foodRating.map((item, index) => (
                            <>
                                <h3>{item.fname}</h3>
                                <Form.Field>
                                    <Rating size='large' defaultRating={0} maxRating={5}
                                            onRate={(e, {rating}) => {
                                                updateFoodReview("rating", rating, item.fid)
                                            }}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <TextArea
                                        placeholder={`How was the ${item.fname}?`}
                                        onChange={(e) => updateFoodReview("review", e.target.value, item.fid)}
                                    />
                                </Form.Field>
                            </>
                        ))}
                    </Form>

                    <Divider/>
                    <Button
                        floated='right'
                        content={'Submit Review'}
                        disabled={count >= 1}
                        color={count >= 1 ? "grey" : "orange"}
                        onClick={() => submitReview(reviews)}
                    />
                </>
            </div>
        </div>
    )
}
