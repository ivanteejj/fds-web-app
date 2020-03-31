import React from "react"
import {Grid} from "semantic-ui-react";

export default function OrderDetails({o}) {
    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>Subtotal</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`$${o.cartCost.toFixed(1)}`}</h3>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>Delivery Fee</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`$${o.deliveryFee.toFixed(1)}`}</h3>
                </Grid.Column>
            </Grid.Row>

            {o.promoApplied &&
            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h3>{`Promo applied: ${o.promoApplied.details}`}</h3>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h3>{`- $${o.promoApplied.offset.toFixed(1)}`}</h3>
                </Grid.Column>
            </Grid.Row>
            }

            <Grid.Row>
                <Grid.Column textAlign={'left'}>
                    <h2>Total</h2>
                </Grid.Column>

                <Grid.Column textAlign={'right'}>
                    <h2>{`$${o.totalCost.toFixed(1)}`}</h2>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}