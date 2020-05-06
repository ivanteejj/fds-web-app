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
    Radio, Dropdown
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
                offset_type: "promo",
                promo_details_text: action.details,
                value: action.value
            };
        case "rewards":
            return {
                offset_type: "rewards",
                promo_details_text: `{action.value} reward points redeemed`,
                value: action.value,
            };
        case "reset":
            return {
                offset_type: null,
                promo_details_text: null,
                value: null
            };
        default:
            return state;
    }
}

export default function Popup({remainPopup, submitOrder, rewardPts, promos, cart, cartCost, deliveryFee, totalCost, deliveryLoc, paymentMtds}) {
    const [appliedPromo, setAppliedPromo] = useState()
    const [costOffset, setCostOffset] = useState(0)
    const [total, setTotal] = useState(totalCost)
    const [selectedLoc, setDeliveryLoc] = useState(null)
    const [deliveryAreaInput, setDeliveryAreaInput] = useState(areaOptions[0].value)
    const [deliveryLocInput, setDeliveryLocInput] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

    const [offset, setOffSet] = useReducer(offsetReducer, {
        offset_type: null,
        promo_details_text: null,
        value: null
    })

    const placeOrder = () => {
        const address = selectedLoc !== "" ? selectedLoc.address : deliveryLocInput;
        const area = selectedLoc !== "" ? selectedLoc.area : deliveryAreaInput;
        submitOrder(cart, appliedPromo, deliveryFee, total, address, area, paymentMode);
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
        if (appliedPromo === promo) {
            setAppliedPromo()
            setCostOffset(0)
        } else {
            setAppliedPromo(promo)
            setCostOffset(PromoUtils.promoOffset(promo, cartCost, deliveryFee))
        }

        setTotal(totalCost - costOffset)
    }

    const disableSubmit = () => {
        return selectedLoc === null || (deliveryLocInput === "" && selectedLoc === "") || (paymentMode === "")
    }

    useEffect(() => {
        if (appliedPromo) {
            setTotal(totalCost - costOffset)
        } else {
            setTotal(totalCost)
        }
    }, [appliedPromo, totalCost, costOffset])

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
                                                        <Button content={appliedPromo === promo ? "Applied" : "Apply"}
                                                                color={appliedPromo === promo ? "grey" : "teal"}
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

                        {appliedPromo &&
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>{`Promo applied: ${appliedPromo.details}`}</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`- $${Utils.roundDecimalPlace(costOffset, 1)}`}</h3>
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
                                       checked={paymentMode === paymentMtd.mode}
                                       onChange={() => setPaymentMode(paymentMtd.mode)}
                                />
                                </Form.Field>
                            )
                        })}
                    </Form>

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