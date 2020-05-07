import React, {useState, useEffect} from "react"
import {Card, Divider, Grid, Header, Rating, Label, Item} from "semantic-ui-react";
import ReviewsStatistics from "../../../elements/rider/reviews/ReviewsStatistics";
import axios from "axios";

const fakeReviews = {
    data: [
        {riderid: "phukai", rating: 5, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 4, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 3, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 3, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 3, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 3, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 1, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 1, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
        {riderid: "phukai", rating: 1, review: "Friendly rider with a big smile", dt_order_delivered: "2020-02-22 19:20:00"},
    ]
}

export default function Reviews({userid}) {
    const [reviews, setReviews] = useState(null);

    useEffect(() => {
        (async() => {
            await axios
                .get('/Rider/getAllReviewsOfOneRider/', {
                    params: {
                        rider_id: userid
                    }
                })
                .then((response) => setReviews(response.data))
        })()
    }, [])

    return (
        <>
            <Grid relaxed>
                <Grid.Column width={1}/>
                <Grid.Column width={3}>
                    {reviews && (<ReviewsStatistics reviews={reviews}/>)}
                </Grid.Column>

                <Grid.Column width={8}>
                    {(!reviews || reviews.length < 1) && (
                        <Header as={'h1'}>No Ratings for you yet!</Header>
                    )}

                    {reviews && reviews.length > 0 && (
                        <>
                            <Header as={'h1'} textAlign={'left'}>{`My Reviews`}</Header>
                            <Header sub textAlign={'left'}>All reviewers are kept anonymous</Header>
                            <Divider/>
                            {reviews.map((item) => (
                                <Card fluid>
                                    <Card.Content textAlign={'left'}>
                                        <Card.Meta>{`Order on ${item.dt_order_delivered}`}</Card.Meta>
                                        <Label ribbon>
                                            Rating: <Rating defaultRating={item.rating} maxRating={5} icon={'star'} disabled/>
                                            ({item.rating}/5)
                                        </Label>
                                        <Item>
                                            <Item.Content>
                                                <Item.Meta>Review on your service</Item.Meta>
                                                <Item.Description>{item.review}</Item.Description>
                                            </Item.Content>
                                        </Item>
                                    </Card.Content>
                                </Card>
                            ))}
                        </>
                    )}
                </Grid.Column>

                <Grid.Column width={4}/>
            </Grid>
        </>
    )
}