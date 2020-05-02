import React from "react"
import {Card, Divider, Grid, Header, Rating} from "semantic-ui-react";

const starsArr = [5,4,3,2,1];
export default function ReviewsStatistics({reviews}) {

    const decimalPlace = (x, dp) => {
        return Number.parseFloat(x).toFixed(dp)
    }

    const countReviews = (numStars) => {
        return reviews.filter(x => x.rating === numStars).length
    }

    const totalStars = () => {
        return reviews.reduce((accum, x)=> accum + x.rating, 0)
    }

    const avgRating = () => {
        return totalStars(reviews) / reviews.length
    }

    return (
        <>
            <Header as={'h1'} textAlign={'left'}>{`My Statistics`}</Header>
            <Card fluid>
                <Card.Content textAlign={'left'}>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h5>Overall Rating</h5>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h4>{`${decimalPlace(avgRating(), 1)} /5`}</h4>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h5>Total Reviews</h5>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h4>{`${reviews.length}`}</h4>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Divider/>

                    <Grid columns={2}>
                    {starsArr.map(x => (
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <Rating defaultRating={x} maxRating={5} icon={'star'} disabled/>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <text>{`${countReviews(x)}`}</text>
                            </Grid.Column>
                        </Grid.Row>
                    ))}
                    </Grid>
                </Card.Content>
            </Card>
        </>
    )
}