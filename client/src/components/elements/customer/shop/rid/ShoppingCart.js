import React from 'react'
import {
    Button,
    Header,
    Divider,
    Card,
    Grid
} from 'semantic-ui-react'
import Utils from "../../../../commons/Utils";

export default function ShoppingCart({addQty, reduceQty, removeItem, toCheckout, cart, cartCost, deliveryFee, totalCost}) {
    return (
        <>
            <Header as={'h2'}>Shopping Cart</Header>
            {cart.map(item => {
                return (
                    <Card>
                        <Card.Content>
                            <Button floated={'right'} icon={'close'} size={'mini'} color={'red'}
                                    onClick={() => removeItem(item.id)}
                            />
                            <Card.Header>{item.name}</Card.Header>
                            <Card.Description>{`${item.quantity} x $${item.price} each`}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button.Group>
                                            <Button icon={'plus'}
                                                onClick={() => addQty(item.id, item.qty_left)}
                                                disabled={item.quantity === item.qty_left}
                                            />
                                            <Button basic content={item.quantity}/>
                                            <Button icon={'minus'}
                                                    onClick={() => reduceQty(item.id)}
                                            />
                                        </Button.Group>
                                    </Grid.Column>

                                    <Grid.Column textAlign={'center'}>
                                        <h2>{`$${Utils.roundDecimalPlace(item.price*item.quantity, 1)}`}</h2>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Content>
                    </Card>
                )
            })}
            <Divider/>

            {cart.length > 0 && cart !== undefined && (
                <>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <h3>Subtotal</h3>
                            </Grid.Column>

                            <Grid.Column>
                                <h3>{`$${Utils.roundDecimalPlace(cartCost, 1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <h3>Delivery Fee</h3>
                            </Grid.Column>

                            <Grid.Column>
                                <h3>{`$${Utils.roundDecimalPlace(deliveryFee, 1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <h2>Total</h2>
                            </Grid.Column>

                            <Grid.Column>
                                <h2>{`$${Utils.roundDecimalPlace(totalCost, 1)}`}</h2>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </>
            )}

            <Button content={'Check Out'}
                    color={cart.length < 1 || cart === undefined ? "grey" : "teal"}
                    disabled={cart.length < 1 || cart === undefined}
                    onClick={() => toCheckout(true)}
            />

        </>
    )
}