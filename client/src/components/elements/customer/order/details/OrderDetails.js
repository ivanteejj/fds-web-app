import React from "react"
import {Grid} from "semantic-ui-react";
import Utils from "../../../../commons/Utils";

const computeTotalCost = (cartCost, deliveryFee, discount) => {
    return cartCost + deliveryFee - discount;
}

export default function OrderDetails({o}) {
    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>Subtotal</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`$${Utils.roundDecimalPlace(o.cartcost, 1)}`}</h3>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>Delivery Fee</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`$${Utils.roundDecimalPlace(o.deliveryfee,1)}`}</h3>
                </Grid.Column>
            </Grid.Row>

            {o.promo_details_text &&
            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>{`Promo applied: ${o.promo_details_text}`}</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`- $${Utils.roundDecimalPlace(o.discount_amount, 1)}`}</h3>
                </Grid.Column>
            </Grid.Row>
            }

            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h2>Total</h2>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h2>{`$${Utils.roundDecimalPlace(computeTotalCost(o.cartcost, o.deliveryfee, o.discount_amount), 1)}`}</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}