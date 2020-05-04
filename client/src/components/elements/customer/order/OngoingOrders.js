import React, { useState } from "react"
import {
    Header,
    Divider,
    Card,
    Item,
    Grid,
    Button
} from "semantic-ui-react";
import OrderDetails from "./details/OrderDetails";
import CartDetails from "./details/CartDetails";
import OrderStatus from "./details/OrderStatus";

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

export default function OngoingOrders({orders}) {
    const [hideStatus, setHideStatus] =  useState(Array.apply(true, new Array(orders.length)))

    const showStatus = (idx) => {
        let arr = hideStatus.slice()
        arr[idx] = !hideStatus[idx]
        setHideStatus(arr)
    }

    return (
        <>
            <Header as={'h1'}>{`Active Orders`}</Header>
            <Divider/>
            {orders && orders.map((order, idx) => {
                return (
                    <Card fluid>
                        <Card.Content>
                            <h2>{`Order ID: #${order.oid}`}</h2>

                            <Item>
                                <Item.Description>{`Order placed: ${order.dt_order_placed}`}</Item.Description>
                                <Item.Description>{`Restaurant: ${order.cart[0].rname}`}</Item.Description>
                                <Item.Description>{`Rider: ${order.riderid}`}</Item.Description>
                                <Item.Description>{`Delivery Address: ${order.deliverylocation}`}</Item.Description>
                                <Item.Description>{`Payment Mode: ${order.paymentmode}`}</Item.Description>
                            </Item>

                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <h2>{showLatestStatus(order)}</h2>
                                    </Grid.Column>

                                    <Grid.Column width={4}>
                                        <Button floated={'right'} size="tiny"
                                                color={!hideStatus[idx] ? "orange" : "grey"}
                                                content={!hideStatus[idx] ? "Show Details" : "Hide Details"}
                                                onClick={() => showStatus(idx)}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                {hideStatus[idx] && <OrderStatus o={order}/>}
                            </Grid>

                            <Divider/>

                            <CartDetails cart={order.cart} />

                            <Divider/>

                            <OrderDetails o={order}/>

                        </Card.Content>
                    </Card>
                )
            })}
        </>
    )
}