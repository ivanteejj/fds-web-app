import React, {useEffect, useReducer, useState} from "react"
import {Button, Grid, Header} from "semantic-ui-react";
import Utils from "../../../commons/Utils";
import Promotions from "../../../elements/rstaff/summary/Promotions";
import PopupEditPromo from "../../../elements/rstaff/summary/PopupEditPromo";
import PopupAddPromo from "../../../elements/rstaff/summary/PopupAddPromo";

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

export default function FdsPromotions() {
    const [promotions, setPromotions] = useState([])

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

    useEffect(() => {
        (async() => {
            // TODO: (backend) code here for first rendering of page
            // get all fds promotions
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
                <Grid.Column width={2}>
                    <Button floated={'center'} size="medium"
                            content={'Add Promo'}
                            color={'teal'}
                            onClick={() => openPopup("addPromo", true, null)}
                    />
                </Grid.Column>

                <Grid.Column width={12} textAlign={'center'}>
                    <Header as={'h1'}>FDS Promotions</Header>
                    {(!promotions || promotions.length < 1) && (<h2>No Promotions</h2>)}
                    {promotions && promotions.length > 0 && (
                        <Promotions promotions={promotions} openPromo={openPopup}/>
                    )}
                </Grid.Column>

                <Grid.Column width={2}/>
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