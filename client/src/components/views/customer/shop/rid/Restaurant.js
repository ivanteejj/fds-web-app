import React, {useEffect, useState} from 'react'
import {
    Grid,
    Header,
    Card
} from 'semantic-ui-react'
import {useParams, useHistory} from 'react-router-dom'
import Menu from "../../../../elements/customer/shop/rid/Menu"
import ShoppingCart from "../../../../elements/customer/shop/rid/ShoppingCart"
import Popup from "../../../../elements/customer/shop/rid/PopupCheckOut"
import Utils from "../../../../commons/Utils";
import DateTimeUtils from "../../../../commons/DateTimeUtils";
import PromoUtils from "../../../../commons/PromoUtils";
import axios from 'axios'

const fakeCid = 20

const fakePromos = {
    data: [
        {type: 'CART', disc: 0.25, disc_type: 'PERCENT', details: '25% off on all food'},
        {type: 'DELIVERY', disc: 3, disc_type: 'DOLLAR', details: '$3 off on delivery fee'},
        {type: 'DELIVERY', disc: 1, disc_type: 'PERCENT', details: 'Free Delivery Fee'},
        {type: 'CART', disc: 0.2, disc_type: "PERCENT", details: "20% off on order more than $100"}
    ]
}

const fakeRecentDeliverLoc = {
    data: [
        {address: "Blk 233 #01-123 Bishan Avenue ABC Singapore 123455", area: "North"},
        {address: "Tampines Mall Dropoff Point near Taxi-Stand", area: "South"},
        {address: "NUS University Town Starbucks", area: "West"},
        {address: "NUS Science Library", area: "West" },
        {address: "Blk 999 #09-999 Yishun Avenue ABC Singapore 999111", area: "East"}
    ]
}

const fakePaymentOptions = {
    data: [
        'CASHONDELIVERY',
        'CREDITCARD'
    ]
}

// calculate total cost of cart (excluding delivery fee)
function sumCartCost(cart) {
    return cart.reduce((accum, x) =>
        accum + (x.quantity * x.price)
    , 0)
}

export default function Restaurant({ userid }) {
    let params = useParams()
    let history = useHistory()

    const [menu, setMenu] = useState([]);
    const [rdetails, setRDetails] = useState({});
    const [cart, setCart] = useState([]);
    const [cartCost, setCartCost] = useState(0); // exclude delivery
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [checkout, setCheckout] = useState(false);
    const [promos, setPromos] = useState([]);
    const [recentDeliveryLoc, setRecentDeliveryLoc] = useState([]);
    const [paymentMtds, setPaymentMtds] = useState([]);
    const [rewardPts, setRewardPts] = useState(0);

    // HARD CODED % DELIVERY FEE
    const delivery_base = 3
    const delivery_percent = 0.025

    const payment_type = async (paymentMode, cc) => {
        if (paymentMode === "CREDITCARD") {
            await axios.post('/customer/editCreditCard/', {
                cid: userid,
                credit_card_number: cc
            }).then((resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });
        }
    }

    const submitOrder = async (cart, offset, deliveryFee, totalCharge, deliveryLoc, deliveryArea,
                               payment_mode, cc, cust_points, discount_amount, pid) => {

        payment_type(payment_mode, cc);
        await axios.get('/customer/shop/getAllCurrentlyAvailableRider/')
            .then( async (resp) => {
                let listOfAvailableRider = resp.data
                console.log(listOfAvailableRider)
                const rider = listOfAvailableRider[Math.floor(Math.random() * listOfAvailableRider.length)];
                console.log("rider selected:" + rider.rider_id)

                await axios.post('/customer/shop/newOrder/', {
                    cid: userid,
                    payment_method: payment_mode,
                    cart_fee: cartCost,
                    delivery_fee: deliveryFee,
                    discount_amount: discount_amount,
                    delivery_location: deliveryLoc,
                    delivery_location_area: deliveryArea,
                    rider_id: rider.rider_id,
                    rider_bonus: 3 + (cartCost * 0.1),
                    pid: pid
                }).then((resp) => {
                    console.log(resp);
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });

        let pts = Utils.numberRoundDP((rewardPts - cust_points) + (totalCharge), 0)
        await axios.post('/customer/updatePoints/', {
            cid: userid,
            points: pts
        }).then((resp) => {
            console.log(resp);
        }, (error) => {
            console.log(error);
        });
        // once order successful, direct to home page
        history.push("/customer/order")
    }

    const addToCart = (fid, fname, price, qty_left) => {
        var existItem = cart.filter(x => x.id === fid)[0];
        const otherItems = cart.filter(x => x.id !== fid);

        if (!existItem && qty_left > 0) {
            setCart(cart.concat({id: fid, name: fname, quantity: 1, price: price, qty_left: qty_left}));
        } else if (qty_left > existItem.quantity) {
            existItem.quantity++;
            setCart(otherItems.concat(existItem));
        }
    }

    const incrementQty = (fid, qty_left) => {
        setCart(
            cart.map(item => {
                if (item.id === fid) {
                    if (qty_left > item.quantity){
                        return {...item, quantity: ++item.quantity}
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            })
        )
    }

    const decrementQty = (fid) => {
        var existItem = cart.filter(x => x.id === fid)[0];
        const otherItems = cart.filter(x => x.id !== fid);

        if (existItem.quantity > 1) {
            existItem.quantity--;
            setCart(otherItems.concat(existItem));
        } else {
            setCart(otherItems); // remove item from cart
        }
    }

    const removeItemInCart = (fid) => {
        const otherItems = cart.filter(x => x.id !== fid);

        setCart(otherItems); // remove item from cart
    }

    const openPopupCheckOut = (boo) => {
        setCheckout(boo)
    }
    
    useEffect(() => {
        (async() => {
            //TODO: get user's reward points
            //userid
            setPaymentMtds(fakePaymentOptions.data);
            const menu = await axios
                 .get('/customer/shop/getMenu', {
                     params: {
                       rid: params.rid
                     }
                   })
                 .then((response) => setMenu(Utils.groupBy(response.data, 'category')))
                 .then((error) => console.log(error))

             const restDetails = await axios
                   .get('/customer/shop/getRestaurantDetails', {
                     params: {
                         rid: params.rid
                       }
                   })
                   .then((response) => setRDetails(response.data[0]))


            const deliveryLOC = await axios
                .get("/customer/shop/getRecentDeliveryAddress/", {
                    params: {
                        cid: fakeCid
                    }
                })
                .then((response) => setRecentDeliveryLoc(response.data))

            const promos = await axios
                .get('/customer/shop/getAllRelevantPromosForOneCust', {
                params: {
                    rid: params.rid
                }
            })
            .then((response) => setPromos(response.data))

            // const pts = await axios
            //     .get('/customer/getCustPoints/', {
            //         params: {
            //             cid: userid
            //         }
            //     })
            //     .then((response) => {
            //         console.log(response.data)
            //         console.log(response.data[0])
            //         console.log(response.data[0].points)
            //         setRewardPts(response.data[0].points)
            //     })
            //     .then((error) => console.log(error))
            setRewardPts(100);
        })();
    }, []);

    useEffect(() => {
        setCartCost(sumCartCost(cart))
        setDeliveryFee(Utils.numberRoundDP((cartCost * delivery_percent) + delivery_base, 1))
        setTotalCost(deliveryFee + cartCost)
    }, [cart, cartCost, deliveryFee])

    useEffect(() => {
        // triggered when detect change in checkout variable
        if (checkout) {
            setPromos(promos)
            //setPromos(PromoUtils(promos, cartCost))
        }
    }, [checkout])

    return (
        <>
            <Grid relaxed>
                <Grid.Row>
                    <Grid.Column width={1}/>
                    <Grid.Column width={3}>
                        <Header as={'h2'}>{`${rdetails.rname}`}</Header>
                        <Card>
                            <Card.Content>
                                <Card.Header>Address</Card.Header>
                                <Card.Description>{rdetails.address}</Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={8}>
                        <Menu addCart={addToCart} menu={menu}/>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <ShoppingCart
                            addQty={incrementQty} reduceQty={decrementQty} removeItem={removeItemInCart}
                            cart={cart} cartCost={cartCost} deliveryFee={deliveryFee} totalCost={totalCost}
                            toCheckout={openPopupCheckOut}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {checkout &&
                <Popup remainPopup={openPopupCheckOut} rewardPts={rewardPts}
                       promos={promos} cart={cart} deliveryFee={deliveryFee} totalCost={totalCost} cartCost={cartCost}
                       deliveryLoc={recentDeliveryLoc} paymentMtds={paymentMtds} submitOrder={submitOrder}
                />
            }
        </>
    )


}