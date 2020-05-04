import React, {useEffect, useState} from 'react'
import {
    Grid,
    Header,
    Card
} from 'semantic-ui-react'
import {useParams, useLocation} from 'react-router-dom'
import Menu from "../../../../elements/customer/shop/rid/Menu"
import ShoppingCart from "../../../../elements/customer/shop/rid/ShoppingCart"
import Popup from "../../../../elements/customer/shop/rid/PopupCheckOut"
import Utils from "../../../../commons/Utils";
import axios from 'axios'

const fakeMenu = {
    data: [
        {fid: 100, fname: "Regular Milk Tea", rid: 1000, price: 3.5, category: "Beverages", qty_left: "100", rating: 4,
        reviews: ["Amazing food!", "Smells and taste like heavenly", "Michelin Quality drink"]},
        {fid: 101, fname: "Avocado Melon Tea", rid: 1000, price: 2.9, category: "Beverages", qty_left: "20", rating: 5,
        reviews: ["Mind Blowing drink"]},
        {fid: 102, fname: "Brown Sugar Fries", rid: 1000, price: 9.70, category: "Western", qty_left: "10", rating: null},
        {fid: 103, fname: "Eww Eel Bento", rid: 1000, price: 25.90, category: "Japanese", qty_left: "15", rating: null},
        {fid: 104, fname: "Yaya Papaya Macaron", rid: 1000, price: 10.9, category: "Dessert", qty_left: "5", rating: 2},
        {fid: 105, fname: "Creme Brulee", rid: 1000, price: 5.9, category: "Dessert", qty_left: "10", rating: 4}
    ]
}

const fakeRDetails = {
    data: [
        {rid: 1000, rname: "LiWOW", area: "West", address: "Block 443 Tampines Street AAA Avenue 10"}
    ]
}

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
        {mode: "Cash On Delivery"},
        {mode: "Credit Card"}
    ]
}

// calculate total cost of cart (excluding delivery fee)
function sumCartCost(cart) {
    return cart.reduce((accum, x) =>
        accum + (x.quantity * x.price)
    , 0)
}

export default function Restaurant({ match }) {
    let params = useParams()
    let location = useLocation()

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
    const [userid, setUserid] = useState(null)

    const [test, setTest] = useState(null)

    // HARD CODED % DELIVERY FEE
    const delivery_base = 3
    const delivery_percent = 0.025

    const submitOrder = (cart, appliedPromo, deliveryFee, totalCharge, deliveryLoc, deliveryArea, paymentMode) => {
        // TODO: backend code for submit order
        // generate order in backend
        setTest({area: deliveryArea, address: deliveryLoc})
        // once order successful, direct to home page
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
             const userid = location.state.userid
            setUserid(userid)
            // const menu = await axios
            //     .get('/customer/shop/menu', {
            //         params: {
            //           rid: params.rid
            //         }
            //       })
            //     .then((response) => setMenu(Utils.groupBy(response.data, 'category')))
            //     .then((error) => console.log(error))
            //
            // const restDetails = await axios
            //       .get('/customer/shop/restaurant', {
            //         params: {
            //             rid: 2
            //           }
            //       })
            //       .then((response) => setRDetails(response.data[0]))
            //
            setMenu(Utils.groupBy(fakeMenu.data, 'category'))
            setRDetails(fakeRDetails.data[0])
            setRecentDeliveryLoc(fakeRecentDeliverLoc.data)
            setPaymentMtds(fakePaymentOptions.data);
        })();
    }, []);

    useEffect(() => {
        setCartCost(sumCartCost(cart))
        setDeliveryFee((cartCost * delivery_percent) + delivery_base)
        setTotalCost(deliveryFee + cartCost)
    }, [cart, cartCost, deliveryFee])

    useEffect(() => {
        // triggered when detect change in checkout variable
        //TODO: backend code to retrieve applicable promos
        if (checkout) {
            var cart = cartCost
            //axios code here
            let data = fakePromos.data
            setPromos(data)
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
                <Popup remainPopup={openPopupCheckOut}
                       promos={promos} cart={cart} deliveryFee={deliveryFee} totalCost={totalCost} cartCost={cartCost}
                       deliveryLoc={recentDeliveryLoc} paymentMtds={paymentMtds} submitOrder={submitOrder}
                />
            }

            {cart.map(d => {
                return <>{`item:${d.id} quantity: ${d.quantity}`}</>;
            })}

            {test && (
                <text>{`area: ${test.area}, address: ${test.address}`}</text>
            )}

            {userid && (<text>{userid}</text>)}
        </>
    )


}