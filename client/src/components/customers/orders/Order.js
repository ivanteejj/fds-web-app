import React, {useEffect, useState, useReducer} from 'react'
import {
    Card,
    Form,
    Grid,
    Header,
    Radio
} from "semantic-ui-react";
import OngoingOrders from "./OngoingOrders";
import CompletedOrders from "./CompletedOrders";
import PopupLeaveReview from "./PopupLeaveReview";
import PopupViewReview from "./PopupViewReview";
import generateReviewSkeleton from "./ReviewSkeleton";

//NOTE: ORDERS SHOULD ALR BE SORTED IN DESC ORDER BASED ON dt_order_placed UNDER BOTH UNCOMPLETED AND COMPLETED ORDER GROUPS
const fakeOrders = {
    uncompleted_orders: [
        {oid: 100123, totalCost: 49.5, deliveryFee: 4.1, cartCost: 45.4,
            promoApplied: null, paymentMode: "Cash On Delivery",
            deliveryLocation: "NUS Central Library", riderid: "benwang",
            dt_order_placed: "2020-02-22 19:10:25", dt_rider_departs: "2020-02-22 19:20:00",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 3, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 2, price: 2.9},
                {fid: 102, rid: 1000, rname: "LiWoW", fname: "Brown Sugar Fries", quantity: 3, price: 9.7}
            ]
        }
    ],
    completed_orders: [
        {oid: 100100, totalCost: 10.1, deliveryFee: 3.2, cartCost: 9.9,
            promoApplied: {details: '$3 off on delivery fee', offset: 3},
            paymentMode: "Cash On Delivery",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2019-12-22 19:10:25", dt_rider_departs: "2019-12-22 19:20:25",
            dt_rider_arrives_rest: "2019-12-22 19:22:25", dt_rider_departs_rest: "2019-12-22 19:25:25",
            dt_order_delivered: "2019-12-22 19:35:00",
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 2, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 1, price: 2.9}
            ], review: null
        },
        {oid: 100000, totalCost: 13.1, deliveryFee: 3.2, cartCost: 9.9,
            promoApplied: null,
            paymentMode: "Credit Card",
            deliveryLocation: "NUS Central Library", riderid: "phukai",
            dt_order_placed: "2019-12-12 12:10:25", dt_rider_departs: "2019-12-12 12:20:25",
            dt_rider_arrives_rest: "2019-12-12 12:22:25", dt_rider_departs_rest: "2019-12-12 12:25:25",
            dt_order_delivered: "2019-12-12 12:35:00",
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 2, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 1, price: 2.9}
            ],
            review: {
                rider: {riderid: "phukai", rating: 5, review: "Friendly and polite"},
                foodRating: [
                    {fid: 101, fname: "Avocado Melon Tea", rating: 5, review: "Best melon tea in singapore!"},
                    {fid: 100, fname: "Regular Milk Tea", rating: 2, review: "Too bland and the pearls are hard to chew..."}
                ]
            }
        }
    ]
}

export default function Order() {
    const [orders, setOrders] = useState({})
    const [filterOption, setFilterOption] = useState("")
    const [filteredOrders, setFilteredOrders] = useState({})

    const reducer = (state, action) => {
        return {...state, [action.type]: action.payload}
    }

    const [showReview, setShowReview] = useReducer(reducer, {
        viewReview: false,
        leaveReview: false,
        review: null
    })

    const showPopup = (type, boo) => {
        setShowReview({type: type, payload: boo})
        setShowReview({type: "review", payload: null})
    }

    const openReview = (type, boo, order) => {
        if (type === "leaveReview") {
            setShowReview({type: "review", payload: generateReviewSkeleton(order)})
        } else {
            setShowReview({type: "review", payload: order.review})
        }

        setShowReview({type: type, payload: boo})
    }

    const submitReview = (reviews) => {
        showPopup("leaveReview", false)

        //FOR TESTING PURPOSE ONLY - view submitted review at bottom of the page
        setShowReview({type: "review", payload: reviews})

        // submit review to backend

        // retrieve orders from backend again

        // close popup
    }

    useEffect(() => {
        (async() => {
            // const result = await axios.get("sth sth");
            setOrders(fakeOrders)
        })();
    }, []);

    useEffect(() => {
        filterOrders(filterOption)
    }, [orders])

    const filterOrders = (filter) => {
        setFilterOption(filter)
        switch (filter) {
            case "":
                setFilteredOrders(orders)
                break;
            case "ongoing":
                setFilteredOrders({...orders, completed_orders: []})
                break;
            case "completed":
                setFilteredOrders({...orders, uncompleted_orders: []})
                break;
        }
    }

    return (
        <>
            <Grid relaxed>
                <Grid.Column width={1}/>
                <Grid.Column width={3}>
                    <Header as={'h1'}>{`My Orders`}</Header>
                    <Card>
                        <Card.Content>
                            <Card.Header>Filter by</Card.Header>
                            <Card.Description>
                                <Form>
                                    <Form.Field>
                                        <Radio label={"All Orders"}
                                               value={""}
                                               checked={filterOption === ""}
                                               onChange={() => filterOrders("")}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Radio label={"Ongoing Orders"}
                                               value={"ongoing"}
                                               checked={filterOption === "ongoing"}
                                               onChange={() => filterOrders("ongoing")}
                                        />
                                    </Form.Field>

                                    <Form.Field>
                                        <Radio label={"Completed Orders"}
                                               value={"completed"}
                                               checked={filterOption === "completed"}
                                               onChange={() => filterOrders("completed")}
                                        />
                                    </Form.Field>
                                </Form>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>

                <Grid.Column width={8}>
                    {(filterOption === "" || filterOption === "ongoing") &&
                        <OngoingOrders orders={filteredOrders.uncompleted_orders}/>
                    }

                    {(filterOption === "" || filterOption === "completed") &&
                        <CompletedOrders orders={filteredOrders.completed_orders}
                                         openReview={openReview}
                        />
                    }
                </Grid.Column>
                <Grid.Column width={4}/>

            </Grid>

            {showReview.leaveReview && showReview.review &&
                <PopupLeaveReview hidePopup={showPopup} review={showReview.review}
                                  submitReview={submitReview}
                />
            }

            {showReview.viewReview && showReview.review &&
                <PopupViewReview hidePopup={showPopup} review={showReview.review}/>
            }

            {showReview.review &&
                <>
                    <text>
                        {`rider: ${showReview.review.rider.riderid} rating: ${showReview.review.rider.rating} 
                        review: ${showReview.review.rider.review}`}
                    </text>
                    {showReview.review.foodRating.map(item => (
                        <text>{`food: ${item.fname} rating: ${item.rating} review: ${item.review}`}</text>
                    ))}
                </>
            }
        </>
    )
}