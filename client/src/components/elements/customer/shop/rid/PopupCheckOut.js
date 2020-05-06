import React, {useEffect, useState, useReducer} from "react";
import {
    Button,
    Header,
    Divider,
    Item,
    Grid,
    TextArea,
    Form,
    Label,
    Radio,
    Dropdown,
    Input
} from 'semantic-ui-react'
import "../../../../stylesheets/Popup.css"
import Utils from "../../../../commons/Utils";
import PromoUtils from "../../../../commons/PromoUtils";

const areaOptions = [
    {key: 1, text: "North", value: "NORTH"},
    {key: 2, text: "South", value: "SOUTH"},
    {key: 3, text: "East", value: "EAST"},
    {key: 4, text: "West", value: "WEST"},
    {key: 4, text: "West", value: "CENTRAL"},
]

const offsetReducer = (state, action) => {
    switch (action.type) {
        case "promo":
            return {
                offset_type: action.type,
                obj: action.promo,
                value: action.value,
                error: null
            };
        case "rewards":
            return {
                offset_type: action.type,
                obj: null,
                value: 0,
                error: null
            };
        case "update_points":
            return {
                ...state,
                obj: action.points,
                value: action.value,
                error: action.error
            }
        case "reset":
            return {
                offset_type: null,
                obj: null,
                value: 0,
                error: null
            };
        default:
            return state;
    }
}

const paymentReducer = (state, action) => {
    switch (action.type) {
        case "CREDITCARD":
            return {
                mode: action.type,
                value: null
            }
        case "update_creditcard":
            return {
                ...state,
                value: action.value
            }
        default:
            return {
                mode: action.type,
                value: null
            }
    }
}

const rate = 10;
export default function Popup({remainPopup, submitOrder, rewardPts, promos, cart, cartCost, deliveryFee, totalCost, deliveryLoc, paymentMtds}) {
    const [total, setTotal] = useState(totalCost)
    const [selectedLoc, setDeliveryLoc] = useState(null)
    const [deliveryAreaInput, setDeliveryAreaInput] = useState(areaOptions[0].value)
    const [deliveryLocInput, setDeliveryLocInput] = useState("")

    const [offset, setOffset] = useReducer(offsetReducer, {
        offset_type: null,
        obj: null,
        value: 0,
        error: null
    })
    const [paymentMode, setPaymentMode] = useReducer(paymentReducer, {
        mode: null,
        value: null
    })

    const placeOrder = () => {
        const address = selectedLoc !== "" ? selectedLoc.address : deliveryLocInput;
        const area = selectedLoc !== "" ? selectedLoc.area : deliveryAreaInput;
        submitOrder(cart, offset, deliveryFee, total, address, area, paymentMode);
        remainPopup(false) // close popup
    }

    const applyDeliveryOptions = (address) => {
        if (address === selectedLoc) {
            setDeliveryLoc(null)
        } else {
            setDeliveryLoc(address)
        }
    }

    const applyPromo = (promo) => {
        let value = 0;
        switch (offset.offset_type) {
            case "promo": {
                if (promo === offset.obj) {
                    setOffset({type: "reset"})
                } else {
                    let value = PromoUtils.promoOffset(promo, cartCost, deliveryFee)
                    setOffset({type: "promo", promo: promo, value: value })
                }
                break;
            }
            case "rewards":
                setOffset({type: "promo", promo: promo, value: PromoUtils.promoOffset(promo, cartCost, deliveryFee)})
                break;
            default: {
                let value = PromoUtils.promoOffset(promo, cartCost, deliveryFee)
                setOffset({type: "promo", promo: promo, value: value })
            }
            break;
        }
        setTotal(totalCost - value)
    }

    const applyRewards = () => {
        switch (offset.offset_type) {
            case "promo":
                setOffset({type: "rewards"})
                break;
            case "rewards":
                setOffset({type: "reset"})
                break;

            default:
                setOffset({type: "rewards"})
                break;
        }
        setTotal(totalCost)
    }

    const updateRewards = (rewards) => {
        let value = 0
        if (isNaN(rewards) || rewards < 0 || (rewards > 0 && rewards > maxPointsAllowed())) {
            setOffset({type: "update_points", points: rewards, value: 0, error: "Invalid point redemption"})
        } else if (rewards > 0 && rewards <= maxPointsAllowed()) {
            // every 10 points is treated as $1
            let value = rewards > 0 ? rewards / rate : 0;
            setOffset({type: "update_points", points: rewards, value: value, error: null})
        } else {
            setOffset({type: "update_points", points: rewards, value: 0, error: null})
        }
        setTotal(totalCost - value);
    }

    const isPromoApplied = (promo) => {
        return offset.offset_type === "promo" && offset.obj === promo;
    }

    const maxPointsAllowed = () => {
        return rewardPts > (deliveryFee * rate) ? (deliveryFee * rate) : rewardPts
    }

    const disableSubmit = () => {
        return selectedLoc === null || (deliveryLocInput === "" && selectedLoc === "") || paymentMode.mode === null ||
            paymentMode.mode === "" || (paymentMode.mode === "CREDITCARD" && (paymentMode.value == "" || paymentMode.value === null)) ||
            (offset.offset_type && offset.error)
    }

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => remainPopup(false)}>x</span>
                <>
                    <Header as={'h1'}>Checkout</Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <h4>Cart Items</h4>
                                {cart.map((item) => {
                                    return (
                                        <Item>
                                            <Item.Header>{item.name}</Item.Header>
                                            <Grid columns={2}>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Item.Description>{`${item.quantity} x $${item.price} each`}</Item.Description>
                                                    </Grid.Column>

                                                    <Grid.Column textAlign={'center'}>
                                                        <h3>{`$${Utils.roundDecimalPlace(item.price*item.quantity, 1)}`}</h3>
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Item>
                                    )
                                })}
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <h4>Promo Codes</h4>
                                {promos.map(promo => {
                                    return (
                                        <Item>
                                            <Grid columns={3}>
                                                <Grid.Row>
                                                    <Grid.Column>
                                                        <Item.Header>{promo.details}</Item.Header>
                                                    </Grid.Column>

                                                    <Grid.Column textAlign={'right'}>
                                                        {PromoUtils.showPromo(promo)}
                                                    </Grid.Column>

                                                    <Grid.Column>
                                                        <Button content={isPromoApplied(promo) ? "Applied" : "Apply"}
                                                                color={isPromoApplied(promo) ? "grey" : "teal"}
                                                                onClick={() => applyPromo(promo)}
                                                        />
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Item>
                                    )
                                })}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider/>

                    {rewardPts && rewardPts > 0 && (
                        <>
                            <Button content={offset.offset_type === "rewards" ? "Applied" : "Apply"}
                                    color={offset.offset_type === "rewards" ? "grey" : "teal"}
                                    onClick={() => applyRewards()}
                                    floated={'right'}
                            />
                            <Header as={'h2'}>Redeem Reward Points</Header>
                            {offset.offset_type && offset.offset_type === "rewards" && (
                                <>
                                    <Header sub>10 Point = $1</Header>
                                    <Item.Description>{`Your points: ${rewardPts}`}</Item.Description>
                                    <Item.Description>{`Max points available for redemption: ${maxPointsAllowed()}`}</Item.Description>
                                        <Input label='Reward Points'
                                               placeholder='Redeem your rewards points'
                                               value={offset.obj}
                                               onChange={(e, {value}) => updateRewards(value)}
                                        />
                                </>
                            )}

                            {offset.error && <Header size='small' color={'red'}> {offset.error} </Header>}
                        </>
                    )}

                    <Divider/>

                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>Subtotal</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`$${Utils.roundDecimalPlace(cartCost, 1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>Delivery Fee</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`$${Utils.roundDecimalPlace(deliveryFee,1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        {offset.offset_type === "promo" && offset.obj &&
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>{`Promo applied: ${offset.obj.details}`}</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`- $${Utils.roundDecimalPlace(offset.value, 1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>
                        }

                        {offset.offset_type === "rewards" && offset.value > 0 &&
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>{`${offset.obj} reward points redeemed`}</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`- $${Utils.roundDecimalPlace(offset.value, 1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>
                        }

                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h2>Total</h2>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h2>{`$${Utils.roundDecimalPlace(total, 1)}`}</h2>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Divider/>

                    <Header as={'h1'}>Delivery</Header>
                    {deliveryLoc.map(loc => {
                        return (
                            <Item>
                                <Grid columns={2}>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Item.Header>{loc.address}</Item.Header>
                                        </Grid.Column>

                                        <Grid.Column>
                                            <Button content={selectedLoc && selectedLoc.address === loc.address ? "Selected" : "Select"}
                                                    color={selectedLoc && selectedLoc.address === loc.address ? "grey" : "yellow"}
                                                    onClick={() => applyDeliveryOptions(loc)}
                                                    floated={"right"}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Item>
                        )
                    })}
                    <Item>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as={'a'}>Add New Address</Header>
                                </Grid.Column>

                                <Grid.Column>
                                    <Button content={selectedLoc === "" ? "Selected" : "Select"}
                                            color={selectedLoc === "" ? "grey" : "orange"}
                                            onClick={() => applyDeliveryOptions("")}
                                            floated={"right"}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Item>

                    {selectedLoc === "" && (
                        <Form>
                            <Label>Other Delivery Location</Label>
                            <TextArea
                                placeholder={'Enter full address for delivery'}
                                onChange={(e, {value}) => setDeliveryLocInput(value)}
                            />
                            <h4>
                                Delivery Area:  {' '}
                                <Dropdown
                                    simple item
                                    options={areaOptions}
                                    defaultValue={areaOptions[0].value}
                                    onChange={(e, {value}) => setDeliveryAreaInput(value)}
                                />
                            </h4>
                        </Form>

                    )}

                    <Divider/>

                    <Header as={'h1'}>Payment Method</Header>
                    <Form>
                        {paymentMtds.map(paymentMtd => {
                            return (
                                <Form.Field>
                                <Radio label={paymentMtd.mode}
                                       value={paymentMtd.mode}
                                       checked={paymentMode.mode === paymentMtd.mode}
                                       onChange={() => setPaymentMode({type: paymentMtd.mode})}
                                />
                                </Form.Field>
                            )
                        })}
                    </Form>

                    {paymentMode.mode === "CREDITCARD" && (
                        <Input label='Credit Card'
                               value={paymentMode.value}
                               onChange={(e, {value}) => setPaymentMode({type: "update_creditcard", value: value})}
                        />
                    )}

                    <Divider/>

                    <Button
                        floated='right'
                        content={'Place Order'}
                        disabled={disableSubmit()}
                        color={(deliveryLocInput === "" && selectedLoc === "") || (paymentMode === "") ? "grey" : "blue"}
                        onClick={() => placeOrder()}
                    />
                </>
            </div>
        </div>
    );
};