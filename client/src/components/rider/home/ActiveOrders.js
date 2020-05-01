import React, {useState} from "react"
import {Container, Card, Item, Grid, Label, Divider, Button, Segment} from "semantic-ui-react";

const showLatestStatus = (o) => {
    if (o.dt_rider_departs === null) {
        return "Rider is currently occupied with other orders"
    } else if (o.dt_rider_arrives_rest === null) {
        return "Rider is making his way to the restaurant"
    } else if (o.dt_rider_departs_rest === null) {
        return "Rider has arrived the restaurant"
    } else {
        return "Rider has picked up your food and departed the restaurant"
    }
}

const updateStatusDisplay = (o) => {
    if (o.dt_rider_departs === null) {
        return "Serving order"
    } else if (o.dt_rider_arrives_rest === null) {
        return "Reached restaurant"
    } else if (o.dt_rider_departs_rest === null) {
        return "Heading to destination"
    } else {
        return "Order delivered";
    }
}

export default function ActiveOrders({orders, updateRiderStatus}) {
    const [hideStatus, setHideStatus] =  useState(Array.apply(true, new Array(orders.length)))

    const showStatus = (idx) => {
        let arr = hideStatus.slice()
        arr[idx] = !hideStatus[idx]
        setHideStatus(arr)
    }

    const updateStatus = (o) => {
        if (o.dt_rider_departs === null) {
            return updateRiderStatus(o.oid, "dt_rider_departs")
        } else if (o.dt_rider_arrives_rest === null) {
            return updateRiderStatus(o.oid, "dt_rider_arrives_rest")
        } else if (o.dt_rider_departs_rest === null) {
            return updateRiderStatus(o.oid, "dt_rider_departs_rest")
        } else {
            return updateRiderStatus(o.oid, "dt_order_delivered")
        }
    }

    return (
        <Segment.Group style={{ overflow: 'auto'}} horizontal>
            <Container/>
            {orders.map((order, idx) => (
                <Card>
                    <Card.Content textAlign={'left'}>
                        <Item.Header>{`Order #${order.oid}`}</Item.Header>
                        <Item.Description>{``}</Item.Description>
                        <Item.Meta>{`Order placed: ${order.dt_order_placed}`}</Item.Meta>
                        <Item.Description>{`Payment: ${order.paymentMode}`}</Item.Description>
                        <Item.Description>{`Total Cost: $${order.totalCost}`}</Item.Description>
                        <Card>
                            <Card.Content>
                                <Label>Delivery Location</Label>
                                <Item.Description>{order.deliveryLocation}</Item.Description>
                                <Item.Meta>{`Customer: ${order.custid}`}</Item.Meta>
                                <Divider/>
                                <Label>Restaurant</Label>
                                <Item.Description>{order.cart[0].address}</Item.Description>
                                <Item.Meta>{order.cart[0].rname}</Item.Meta>
                            </Card.Content>
                        </Card>

                        <Button size="tiny"
                                color={hideStatus[idx] ? "orange" : "grey"}
                                content={hideStatus[idx] ? "Show Order Items" : "Hide Order Items"}
                                onClick={() => showStatus(idx)}
                        />

                        {hideStatus[idx] &&
                            order.cart.map(item => (
                                <Item>
                                    <Grid columns={2}>
                                        <Grid.Row>
                                            <Grid.Column width={12}>
                                                <Item.Header>{item.fname}</Item.Header>
                                            </Grid.Column>

                                            <Grid.Column width={2} textAlign={'center'}>
                                                <h4>{`x${item.quantity}`}</h4>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Item>
                            ))
                        }

                        <Card>
                            <Card.Content>
                                <Item.Meta>My Status</Item.Meta>
                                <Item.Description>{showLatestStatus(order)}</Item.Description>
                                <Divider/>
                                <Button size="tiny"
                                        color={"teal"}
                                        content={updateStatusDisplay(order)}
                                        onClick={() => updateStatus(order)}
                                />
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>
            ))}
            <Container/>
        </Segment.Group>
    )
}