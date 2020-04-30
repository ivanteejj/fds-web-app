import React from "react"
import {
    Grid,
    Item,
    Card
} from "semantic-ui-react";

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

export default function OrdersSideBar({orders}) {
    return (
        <>
            {orders.map(order => (
                <Card>
                    <Card.Content textAlign={'left'}>
                        <Item.Header>{`Order #${order.oid}`}</Item.Header>
                        <Item.Meta>{`Order placed: ${order.dt_order_placed}`}</Item.Meta>
                        <Card>
                            <Card.Content>
                                <Item.Description>{`Rider: ${order.riderid}`}</Item.Description>
                                <Item.Meta>{showLatestStatus(order)}</Item.Meta>
                            </Card.Content>
                        </Card>

                        {order.cart.map(item => (
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
                        ))}
                    </Card.Content>
                </Card>
            ))}
        </>
    )
}