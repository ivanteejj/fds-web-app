import React, {useEffect, useReducer, useState} from "react"
import {Button, Grid, Header} from "semantic-ui-react";
import Utils from "../../../commons/Utils";
import Promotions from "../../../elements/rstaff/summary/Promotions";
import PopupEditPromo from "../../../elements/rstaff/summary/PopupEditPromo";
import PopupAddPromo from "../../../elements/rstaff/summary/PopupAddPromo";
import axios from "axios";
import DateTimeUtils from "../../../commons/DateTimeUtils";

const promo_type = ['PERCENT', 'DOLLAR']
const promo_cat = ['DELIVERY', 'CART']

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

    const submitAddPromo = async (item) => {
        let min_cost = item.promo_min_cost >= 0 ? item.promo_min_cost : null
        let max_disc = item.promo_max_discount_limit >= 0 ? item.promo_max_discount_limit : null
        let max_redemp = item.promo_max_num_redemption >= 0 ? item.promo_max_num_redemption : null

        await axios
            .post('/FDSManager/addNewPromo/', {
                        promo_rate: item.promo_rate,
                        promo_type: item.promo_type,
                        promo_cat: item.promo_cat,
                        start_datetime: DateTimeUtils.stringtifyPromoDT(item.start_datetime),
                        end_datetime: DateTimeUtils.stringtifyPromoDT(item.end_datetime),
                        promo_min_cost: min_cost,
                        promo_max_discount_limit: max_disc,
                        promo_max_num_redemption: max_redemp,
                        promo_details_text: item.promo_details_text,
                        rid: null
                })
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });
        await axios
            .get('/FDSManager/getPromoStats/', )
            .then((response) => setPromotions(response.data))

        closePopup("addPromo", false)
    }

    const submitEditPromo = async (item) => {
        let min_cost = item.promo_min_cost >= 0 ? item.promo_min_cost : null
        let max_disc = item.promo_max_discount_limit >= 0 ? item.promo_max_discount_limit : null
        let max_redemp = item.promo_max_num_redemption >= 0 ? item.promo_max_num_redemption : null

        await axios
            .post('/FDSManager/editPromo/', {
                pid: item.pid,
                promo_rate: item.promo_rate,
                promo_type: item.promo_type,
                promo_cat: item.promo_cat,
                start_datetime: DateTimeUtils.stringtifyPromoDT(item.start_datetime),
                end_datetime: DateTimeUtils.stringtifyPromoDT(item.end_datetime),
                promo_min_cost: min_cost,
                promo_max_discount_limit: max_disc,
                promo_max_num_redemption: max_redemp,
                promo_details_text: item.promo_details_text
            })
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });

        await axios
            .get('/FDSManager/getPromoStats/', )
            .then((response) => setPromotions(response.data))

        closePopup("editPromo", false)
    }

    const submitDeletePromo = async (item) => {
        await axios
            .delete('/FDSManager/deletePromo/', {
                params: {
                    pid: item.pid
                }})
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });

        await axios
            .get('/FDSManager/getPromoStats/', )
            .then((response) => setPromotions(response.data))

        closePopup("editPromo", false)
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