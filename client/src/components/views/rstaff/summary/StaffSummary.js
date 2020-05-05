import React, {useState, useReducer, useEffect} from "react"
import {
    Button,
    Divider,
    Dropdown,
    Grid
} from "semantic-ui-react";
import DateTimeUtils from "../../../commons/DateTimeUtils";
import OrdersSideBar from "../../../elements/rstaff/summary/OrdersSideBar";
import SummaryStatement from "../../../elements/rstaff/summary/SummaryStatement";
import Promotions from "../../../elements/rstaff/summary/Promotions";
import Utils from "../../../commons/Utils";
import PopupEditPromo from "../../../elements/rstaff/summary/PopupEditPromo";
import PopupAddPromo from "../../../elements/rstaff/summary/PopupAddPromo";
import axios from "axios";

const fakeRID = 1

const fakeOrders = {
    /* TODO: Active orders (restaurant pov) so get orders where dt_rider_departs_rest == null
    *  filter, sort desc order by dt_order_placed
    */
    data: [
        {oid: 100123, riderid: "benwang",
            dt_order_placed: "2020-02-22 19:10:25", dt_rider_departs: "2020-02-22 19:20:00",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 3, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 2, price: 2.9},
                {fid: 102, rid: 1000, rname: "LiWoW", fname: "Brown Sugar Fries", quantity: 3, price: 9.7}
            ]
        },
        {oid: 100100, riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 2, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 1, price: 2.9}
            ]
        },
        {oid: 100000, riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", fname: "Regular Milk Tea", quantity: 2, price: 3.5},
                {fid: 101, rid: 1000, rname: "LiWoW", fname: "Avocado Melon Tea", quantity: 1, price: 2.9}
            ]
        }
    ]
}

const fakeStats = {
    data: [
        /* TODO: period is concat of Month and Year of dt_order_placed
        *  sorted in descending order by month and year
        */
        {month: 3, year: 2020, totalorders: 2000, totalprofit: 34000.20,
            topfavourites: [ // sorted in descending order by qty_sold
                {fid: 100, fname: "Avocado Milk Tea", qty_sold: 200},
                {fid: 101, fname: "Regular Milk Tea", qty_sold: 190},
                {fid: 102, fname: "Brown Sugar Fries", qty_sold: 123},
                {fid: 103, fname: "Brown Sugar Milk Tea", qty_sold: 103},
                {fid: 104, fname: "Creme Brulee", qty_sold: 73}
            ]
        },
        {month: 2, year: 2020, totalorders: 1500, totalprofit: 20000.10,
            topfavourites: [
                {fid: 101, fname: "Regular Milk Tea", qty_sold: 150},
                {fid: 100, fname: "Avocado Milk Tea", qty_sold: 133},
                {fid: 102, fname: "Brown Sugar Fries", qty_sold: 80},
                {fid: 103, fname: "Brown Sugar Milk Tea", qty_sold: 73},
                {fid: 104, fname: "Creme Brulee", qty_sold: 65}
            ]
        }
    ]
}

const fakePromoStats = {
    data: [
        /* TODO: sorted in descending order by dt_start
        */
        {pid: 1204, promo_details_text: "33% on all food items", start_datetime: "13/03/2020 09:00:00", end_datetime: "13/05/2020 22:00:00",
            promo_type: "PERCENT", promo_cat: "CART",avgorders: 921, promo_min_cost: 100, promo_rate: 0.33,
            promo_max_discount_limit: 20, promo_max_num_redemption: 50},
        {pid: 1205, promo_details_text: "10% on all food items", start_datetime: "01/03/2020 09:00:00", end_datetime: "13/03/2020 22:00:00",
            promo_type: "PERCENT", promo_cat: "CART",avgorders: 762, promo_min_cost: 100, promo_rate: 0.10,
            promo_max_discount_limit: 20, promo_max_num_redemption: 50},
        {pid: 1202, promo_details_text: "Free Delivery", start_datetime: "20/02/2020 09:00:00", end_datetime: "28/02/2020 22:00:00",
            promo_type: "PERCENT", promo_cat: "CART",avgorders: 562, promo_min_cost: 100, promo_rate: 1,
            promo_max_discount_limit: 20, promo_max_num_redemption: 50},
        {pid: 1203, promo_details_text: "24% on all food items", start_datetime: "13/02/2020 09:00:00", end_datetime: "14/02/2020 22:00:00",
            promo_type: "PERCENT", promo_cat: "CART",avgorders: 777, promo_min_cost: 100, promo_rate: 0.24,
            promo_max_discount_limit: 20, promo_max_num_redemption: 50}
    ]
}

const promo_type = ["PERCENT", "DOLLAR"]
const promo_cat = ["DELIVERY", "CART"]

const generateFilterOption = (stats) => {
    return stats.map(item => {
        return item.period
    })
}

const filterStats = (data, filter) => {
    return data.filter(item => item.period === filter)[0]
}

const reducer = (state, action) => {
    switch (action.type) {
        case "initialize":
            return {
                stats: action.payload,
                filterOptions: generateFilterOption(action.payload),
                filter: action.payload && action.payload.length > 0 ? action.payload[0].period : null,
                filteredStats: action.payload && action.payload.length > 0 ?
                                filterStats(action.payload, action.payload[0].period) : null
            };
        case "filter":
            return {
                ...state,
                filter: action.payload,
                filteredStats: filterStats(state.stats, action.payload)
            };
        default:
            return state;
    }
}

export default function StaffSummary({userid, rid}) {
    const [orders, setOrders] = useState([])
    const [promotions, setPromotions] = useState([])

    const [filterSummary, setFilterSummary] = useReducer(reducer, {
        stats: [],
        filterOptions: [],
        filter: "",
        filteredStats: {}
    })

    const [showPopup, setShowPopup] = useReducer(Utils.reducer, {
        addPromo: false,
        editPromo: false,
        item: null
    })

    const openPopup = (type, boo, item) => {
        setShowPopup({type: "item", payload: item})
        setShowPopup({type: type, payload: boo})
    }

    const closePopup = (type, boo) => {
        setShowPopup({type: "item", payload: null})
        setShowPopup({type: type, payload: boo})
    }

    const {stats, filterOptions, filter, filteredStats} = filterSummary

    const options = filterOptions.map(item => ({
        key: item,
        text: item,
        value: item
    }))

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            // only render uncompleted orders for restaurant (dt_rider_departs_rest == null)
            let user = userid

            const allRelevantOrders = await axios
                .get('/staff/getAllOrders/', {
                    params: {
                        rid: rid
                    }
                })
                .then((response) => setOrders(response.data))

            const mostPopularItemsByMonth = await axios
                .get('/staff/getMostPopularByMonth/', {
                    params: {
                        rid: rid
                    }
                })
                .then((response) => {
                        console.log(response.data.length)
                        setFilterSummary({type: "initialize", payload: DateTimeUtils.formatDataPeriod(response.data)})
                }

                )


            setPromotions(fakePromoStats.data)
        })()
    }, [])

    const submitAddPromo = (item) => {
        closePopup("addPromo", false)
        // TODO: (backend) code to add new promo
        /* Note:
        * item object contains:
        * promo_details_text, promo_type, promo_cat, promo_rate, start_datetime,
        * end_datetime, promo_max_discount_limit, promo_min_cost, promo_max_num_redemption
        */

        // TODO: (backend) once successfully, get the entire promo schema from db, update the promo at front end
        // setPromotions(*sth sth*)
    }

    const submitEditPromo = (item) => {
        closePopup("editPromo", false)
        // TODO: (backend) code to update promo
        /* Note:
        * item object contains:
        * pid, promo_details_text, promo_type, promo_cat, promo_rate, start_datetime,
        * end_datetime, promo_max_discount_limit, promo_min_cost, promo_max_num_redemption
        *
        * to access item attributes: item.pid, item.promo_rate etc..
        */

        // TODO: (backend) once successful, update the promos at front end by retrieving updated promo from db
        // setPromotions(*sth sth*)
    }

    const submitDeletePromo = (item) => {
        closePopup("editPromo", false)
        // TODO: (backend) code to update promo
        /* Note:
        * item object contains the promo tuple record
        * use pid to update db
        * to access item attributes: item.pid, item.promo_rate etc..
        */

        // TODO: (backend) once successful, update the promos at front end by retrieving updated promo from db
        // setPromotions(*sth sth*)
    }

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1}/>

                    <Grid.Column width={11} textAlign={"left"}>
                        <Grid.Row>
                            <h1>Summary of {' '}
                                <Dropdown
                                    inline
                                    options={options}
                                    value={filter}
                                    onChange={(e, { value }) => {
                                        setFilterSummary({type: "filter", payload: value})
                                    }}
                                />
                            </h1>
                            <SummaryStatement stats={filteredStats}/>
                        </Grid.Row>
                        <Divider/>
                        <Grid.Row>
                            <h1>Promotions</h1>
                            <Button floated={'right'} size={'mini'} color={'pink'}
                                    content={'Add Promo'} onClick={() => openPopup("addPromo", true, null)}
                            />
                            <Promotions promotions={promotions} openPromo={openPopup}/>
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <h2>Pending Orders</h2>
                        <Divider/>
                        <OrdersSideBar orders={orders} className={'child'}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            {showPopup.editPromo && showPopup.item && (
                <PopupEditPromo closePopup={closePopup}
                                submitDeletePromo={submitDeletePromo} submitEditPromo={submitEditPromo}
                                item={showPopup.item} types={promo_type} cats={promo_cat}/>
            )}

            {showPopup.addPromo && (
                <PopupAddPromo closePopup={closePopup} submitAddPromo={submitAddPromo}
                               types={promo_type} cats={promo_cat}/>
            )}
        </>
    )
}