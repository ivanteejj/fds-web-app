import React, {useEffect, useState} from 'react'
import {
    Grid,
    Header,
    Card
} from 'semantic-ui-react'
import Menu from "./Menu"
import ShoppingCart from "./ShoppingCart"
import Popup from "./PopupCheckOut"

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
        {type: 'CART', disc: 0.25, disc_type: 'percent', details: '25% off on all food'},
        {type: 'DELIVERY', disc: 3, disc_type: 'dollar', details: '$3 off on delivery fee'},
        {type: 'DELIVERY', disc: 1, disc_type: 'percent', details: 'Free Delivery Fee'}
    ]
}

const fakeRecentDeliverLoc = {
    data: [
        {address: "Blk 233 #01-123 Bishan Avenue ABC Singapore 123455"},
        {address: "Tampines Mall Dropoff Point near Taxi-Stand"},
        {address: "NUS University Town Starbucks"},
        {address: "NUS Science Library"},
        {address: "Blk 999 #09-999 Yishun Avenue ABC Singapore 999111"}
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

export default function Restaurant() {
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

    // HARD CODED % DELIVERY FEE
    const delivery_base = 3
    const delivery_percent = 0.025

    const submitOrder = (cart, appliedPromo, deliveryFee, totalCharge, deliveryLoc, paymentMode) => {
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
            // const result = await axios.get("sth sth");
            setMenu(groupBy(fakeMenu.data, 'category')) //group food by category
            setRDetails(fakeRDetails.data[0])
            setPromos(fakePromos.data)
            setRecentDeliveryLoc(fakeRecentDeliverLoc.data)
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
        </>
    )


}