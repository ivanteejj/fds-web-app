import React, {useEffect, useReducer, useState} from "react"
import {Button, Grid, Header} from "semantic-ui-react";
import Utils from "../../../commons/Utils";
import Promotions from "../../../elements/rstaff/summary/Promotions";
import PopupEditPromo from "../../../elements/rstaff/summary/PopupEditPromo";
import PopupAddPromo from "../../../elements/rstaff/summary/PopupAddPromo";
import axios from "axios";
import DateTimeUtils from "../../../commons/DateTimeUtils";

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
            const promoStats = await axios
                .get('/FDSManager/getPromoStats/', )
                .then((response) => setPromotions(response.data))
        })()
    }, [])

    /*
    (async() => {
        const promoStats = axios
                    .post('/FDSManager/addNewPromo/', {
                        params: {
                            promo_rate: item.promo_rate,
                            promo_type: item.promo_type,
                            promo_cat: item.promo_cat,
                            start_datetime: item.start_datetime,
                            end_datetime: item.end_datetime,
                            promo_min_cost: item.promo_min_cost,
                            promo_max_discount_limit: item.promo_max_discount_limit,
                            promo_max_num_redemption: item.promo_max_num_redemption,
                            promo_details_text: item.promo_details_text,
                            rid: null
                        }
                    })
                    closePopup("addPromo", false)

        })
     */

    const submitAddPromo = async (item) => {
        await axios
            .post('/FDSManager/addNewPromo/', {
                    params: {
                        promo_rate: item.promo_rate,
                        promo_type: item.promo_type,
                        promo_cat: item.promo_cat,
                        start_datetime: item.start_datetime,
                        end_datetime: item.end_datetime,
                        promo_min_cost: item.promo_min_cost,
                        promo_max_discount_limit: item.promo_max_discount_limit,
                        promo_max_num_redemption: item.promo_max_num_redemption,
                        promo_details_text: item.promo_details_text,
                        rid: null
                    }
                })
                .then((response) => console.log("response"))
        await axios
            .get('/FDSManager/getPromoStats/', )
            .then((response) => setPromotions(response.data))

        closePopup("addPromo", false)
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