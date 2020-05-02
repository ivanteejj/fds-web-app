import React, {useEffect, useState} from 'react'
import {
    Grid,
    Header,
    Card
} from 'semantic-ui-react'
import {useParams, useLocation} from 'react-router-dom'
import Menu from "./Menu"
import ShoppingCart from "./ShoppingCart"
import Popup from "./PopupCheckOut"
import axios from 'axios'

const fakeCid = 1

const fakePromos = {
    data: [
        {type: 'CART', disc: 0.25, disc_type: 'percent', details: '25% off on all food'},
        {type: 'DELIVERY', disc: 3, disc_type: 'dollar', details: '$3 off on delivery fee'},
        {type: 'DELIVERY', disc: 1, disc_type: 'percent', details: 'Free Delivery Fee'},
        {type: 'CART', disc: 0.2, disc_type: "percent", details: "20% off on order more than $100"}
    ]
}


const fakePaymentOptions = {
    data: [
        {mode: "Cash On Delivery"},
        {mode: "Credit Card"}
    ]
}

// grouping food items by its category
function groupBy(data, key) {
    return data.reduce((acc, x) => {
        acc[x[key]] = [...(acc[x[key]] || []), x];
        return acc;
    }, {})
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

    // HARD CODED % DELIVERY FEE
    const delivery_base = 3
    const delivery_percent = 0.025

    const submitOrder = (cart, appliedPromo, deliveryFee, totalCharge, deliveryLoc, paymentMode) => {

        // TODO
        // generate order in backend

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
        var existItem = cart.filter(x => x.id === fid)[0];
        const otherItems = cart.filter(x => x.id !== fid);

        if (qty_left > existItem.quantity) {
            existItem.quantity++;
            setCart(otherItems.concat(existItem));
        }
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

            const menu = await axios
                 .get('/customer/shop/getMenu', {
                     params: {
                       rid: params.rid
                     }
                   })
                 .then((response) => setMenu(groupBy(response.data, 'category')))
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
                        cid: 2
                    }
                })
                .then((response) => setRecentDeliveryLoc(response.data))
            setPromos(fakePromos.data)
            setPaymentMtds(fakePaymentOptions.data);
        })();
    }, []);

    useEffect(() => {
        setCartCost(sumCartCost(cart))
        setDeliveryFee((cartCost * delivery_percent) + delivery_base)
        setTotalCost(deliveryFee + cartCost)
    }, [cart, cartCost, deliveryFee])

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

            {userid && (<text>{userid}</text>)}
        </>
    )


}