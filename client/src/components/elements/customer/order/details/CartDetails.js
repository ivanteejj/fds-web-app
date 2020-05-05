import React from "react"
import {Grid, Item} from "semantic-ui-react";
import Utils from "../../../../commons/Utils";

const CartDetails = ({cart}) => {
    return (
        <>
            <h3>Order Items</h3>
            {cart.map((item, idx) => {
                return (
                    <Item key={idx}>
                        <Item.Header>{item.fname}</Item.Header>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Item.Description>{`${item.quantity} x $${item.price} each`}</Item.Description>
                                </Grid.Column>

                                <Grid.Column textAlign={'center'}>
                                    <Item.Description>{`$${Utils.roundDecimalPlace(item.price*item.quantity, 1)}`}</Item.Description>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Item>
                )
            })}
        </>
    )
}

export default CartDetails