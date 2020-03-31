import React from "react"
import {Button, Card, Divider, Header, Item} from "semantic-ui-react";
import OrderStatus from "./OrderStatus";
import CartDetails from "./CartDetails";
import OrderDetails from "./OrderDetails";

export default function CompletedOrders({orders, openReview}) {
    return (
        <>
            <Header as={'h1'}>{`Completed Orders`}</Header>
            <Divider/>
            {orders && orders.map(order => {
                return (
                    <Card fluid>
                        <Card.Content>
                            <h2>{`Order ID: #${order.oid}`}</h2>
                            <Button floated={'right'} size="small"
                                    color={order.review === null ? 'teal' : "orange"}
                                    content={order.review === null ? 'Leave Review' : "View Review"}
                                    onClick={()=> {
                                        order.review === null ? openReview("leaveReview", true, order)
                                            : openReview("viewReview", true, order)
                                    }}
                            />

                            <Item>
                                <Item.Description>{`Order placed: ${order.dt_order_placed}`}</Item.Description>
                                <Item.Description>{`Restaurant: ${order.cart[0].rname}`}</Item.Description>
                                <Item.Description>{`Rider: ${order.riderid}`}</Item.Description>
                                <Item.Description>{`Delivery Address: ${order.deliveryLocation}`}</Item.Description>
                                <Item.Description>{`Payment Mode: ${order.paymentMode}`}</Item.Description>
                            </Item>

                            <Divider/>

                            <OrderStatus o={order}/>

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