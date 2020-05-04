import React, {Component} from "react"

export default class PromoUtils extends Component {

    // calculate promo offset
    static promoOffset = (promo, cartCost, deliveryFee) => {
        switch(promo.disc_type) {
            case "DOLLAR":
                return promo.disc;
            case "PERCENT":
                switch (promo.type) {
                    case "CART":
                        return promo.disc * cartCost;
                    case "DELIVERY":
                        return promo.disc * deliveryFee;
                    default:
                        return;
                }
            default:
                return;
        }
    }

    // format promo (for display only)
    static showPromo = (promo) => {
        switch(promo.disc_type){
            case 'PERCENT': return (
                <h4>{`${promo.disc * 100}%`}</h4>
            )
            case 'DOLLAR': return (
                <h4>{`$${promo.disc}`}</h4>
            )
            default: return (
                <h4>{`${promo.disc}`}</h4>
            )
        }
    }
}
