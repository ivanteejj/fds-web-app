import React, {useState, useEffect, useReducer} from "react"
import {Divider, Dropdown, Grid} from "semantic-ui-react";
import moment from "moment"
import SummaryDetails from "./SummaryDetails";
import ActiveOrders from "./ActiveOrders";

const fakeSummary = {
    // TODO: For each Schedule ID, get the following:
    //  1) Min Date as start_dt, Max Date as end_dt
    //  2) Total Orders delivered
    //  3) Sum(time_interval) as total_hours
    //  4) Base salary + (total_orders_delivered * rider's incentive) as total_salary
    // data should already be sorted in desc order by data
    data: [
        {sch_id: 1221, start_dt: "25/04/2020", end_dt: "02/05/2020", total_hours: 30, total_orders_delivered: 100, total_salary: 103},
        {sch_id: 1222, start_dt: "15/03/2020", end_dt: "22/03/2020", total_hours: 30, total_orders_delivered: 105, total_salary: 120}
    ]
}

const fakeOngoingOrders = {
    // TODO: generate orders with dt_order_delivered == null
    //  NOTE additional fields: address (restaurant address), custid (customer's userid)
    // data should already be sorted in desc order by dt_order_placed
    data: [
        {oid: 100123, totalCost: 49.5, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "NUS Central Library", riderid: "chukai",
            dt_order_placed: "2020-02-22 19:10:25", dt_rider_departs: "2020-02-22 19:20:00",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 3},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 2},
                {fid: 102, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Brown Sugar Fries", quantity: 3}
            ]
        },
        {oid: 100100, totalCost: 10.1, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 2},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 1}
            ]
        },
        {oid: 100000, totalCost: 10.1, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: "2020-02-22 09:20:25", dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 2},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 1}
            ]
        },
        {oid: 100000, totalCost: 10.1, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 2},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 1}
            ]
        },
        {oid: 100000, totalCost: 10.1, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 2},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 1}
            ]
        },
        {oid: 100000, totalCost: 10.1, paymentMode: "Cash On Delivery", custid: "ivantee",
            deliveryLocation: "Kent Ridge MRT Station Exit B", riderid: "chukai",
            dt_order_placed: "2020-02-22 09:10:25", dt_rider_departs: "2020-02-22 09:20:25",
            dt_rider_arrives_rest: null, dt_rider_departs_rest: null, dt_order_delivered: null,
            cart: [
                {fid: 100, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Regular Milk Tea", quantity: 2},
                {fid: 101, rid: 1000, rname: "LiWoW", address: "20 Tampines Central 1, #01-24, Singapore 529538", fname: "Avocado Melon Tea", quantity: 1}
            ]
        }
    ]
}

const filterStats = (data, filter) => {
    return data && data.length > 0 ? data[filter] : null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "initialize":
            return {
                stats: action.payload,
                filterOptions: action.payload,
                filter: 0,
                filteredStats: filterStats(action.payload, 0)
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


const date_format = "DD/MM/YYYY";

export default function Summary() {
    const [orders, setOrders] = useState(null)
    const [filterSummary, setFilterSummary] = useReducer(reducer, {
        stats: [],
        filterOptions: [],
        filter: "",
        filteredStats: {}
    })
    const {stats, filterOptions, filter, filteredStats} = filterSummary

    const options = filterOptions && filterOptions.map((item, idx) => ({
        key: idx,
        text: `${moment(item.start_dt, date_format).format("Do MMM YY")}
                - ${moment(item.end_dt, date_format).format("Do MMM YY")}`,
        value: idx
    }))

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            // only render incompleted orders (dt_rider_departs_rest == null)
            setOrders(fakeOngoingOrders.data)
            setFilterSummary({type: "initialize", payload: fakeSummary.data})
        })()
    }, [])

    const updateStatus = (oid, type) => {
        //TODO: (backend) code here for updating active order status
        const curr_datetime = moment().toDate();
        switch (type) {
            case "dt_rider_departs":
                //update dt_rider_departs on oid with curr_datetime
                break;
            case "dt_rider_arrives_rests":
                //update dt_rider_arrives_rests on oid with curr_datetime
                break;
            case "dt_rider_departs_rest":
                //update dt_rider_departs_rests on oid with curr_datetime
                break;
            case "dt_order_delivered":
                //update dt_order_delivered on oid with curr_datetime
                break;
            default:
                break;
        }
        //TODO: after successful update,
        // re-render incomplete orders (dt_rider_departs_rest == null)
        // re-render stats
        //setOrders(*newly updated data*)
        //setFilterSummary({type: "initialize", payload: *newly updated data*})
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={2}/>
                <Grid.Column width={12}>
                    {(!orders || orders.length < 1) && <h2>No Active Orders</h2>}
                    {orders && orders.length > 0 && (
                        <>
                            <h1>Active Orders</h1>
                            <ActiveOrders orders={orders}
                                          updateRiderStatus={updateStatus}
                            />
                        </>
                    )}

                    <Divider/>

                    {(!stats || stats.length < 1) && <h2>No Summary</h2>}
                    {stats && stats.length > 1 && (
                        <>
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
                            <SummaryDetails stats={filteredStats}/>
                        </>
                    )}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}