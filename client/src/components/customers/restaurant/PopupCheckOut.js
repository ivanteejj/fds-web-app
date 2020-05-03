import React, {useEffect, useState} from "react";
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
import "./PopupCheckOut.css"

const areaOptions = [
    {key: 1, text: "North", value: "North"},
    {key: 2, text: "South", value: "South"},
    {key: 3, text: "East", value: "East"},
    {key: 4, text: "West", value: "West"},
]

const showPromo = (promo) => {
    switch(promo.disc_type){
        case 'percent': return (
            <h4>{`${promo.disc * 100}%`}</h4>
        )
        case 'dollar': return (
            <h4>{`$${promo.disc}`}</h4>
        )
        default: return (
            <h4>{`${promo.disc}`}</h4>
        )
    }
}

export default function Popup({remainPopup, submitOrder, promos, cart, cartCost, deliveryFee, totalCost, deliveryLoc, paymentMtds}) {
    const [appliedPromo, setAppliedPromo] = useState()
    const [costOffset, setCostOffset] = useState(0)
    const [total, setTotal] = useState(totalCost)
    const [selectedLoc, setDeliveryLoc] = useState(null)
    const [deliveryAreaInput, setDeliveryAreaInput] = useState(areaOptions[0].value)
    const [deliveryLocInput, setDeliveryLocInput] = useState("")
    const [paymentMode, setPaymentMode] = useState("")

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
            switch(promo.disc_type) {
                case "dollar":
                    setCostOffset(promo.disc);
                    break;
                case "percent":
                    switch (promo.type) {
                        case "CART":
                            setCostOffset(promo.disc * cartCost);
                            break;
                        case "DELIVERY":
                            setCostOffset(promo.disc * deliveryFee);
                            break;
                    }
                    break;
            }
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
                                                        <h3>{`$${(item.price*item.quantity).toFixed(1)}`}</h3>
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
                                                        {showPromo(promo)}
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
                                <h3>{`$${cartCost.toFixed(1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>Delivery Fee</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`$${deliveryFee.toFixed(1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>

                        {appliedPromo &&
                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h3>{`Promo applied: ${appliedPromo.details}`}</h3>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h3>{`- $${costOffset.toFixed(1)}`}</h3>
                            </Grid.Column>
                        </Grid.Row>
                        }

                        <Grid.Row>
                            <Grid.Column textAlign={'left'}>
                                <h2>Total</h2>
                            </Grid.Column>

                            <Grid.Column textAlign={'right'}>
                                <h2>{`$${total.toFixed(1)}`}</h2>
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