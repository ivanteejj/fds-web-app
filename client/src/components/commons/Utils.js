import React, {Component} from "react"

export default class Utils extends Component {

    // grouping items by its category (key)
    static groupBy(data, key) {
        return data.reduce((acc, x) => {
            acc[x[key]] = [...(acc[x[key]] || []), x];
            return acc;
        }, {})
    }

    // default reducer for useReducer
    static reducer = (state, action) => {
        return {...state, [action.type]: action.payload}
    }

    // round x to specified dp places (converts to string)
    static roundDecimalPlace = (x, dp) => {
        return Number.parseFloat(x).toFixed(dp)
    }

    // round x to specified dp places (number type)
    static numberRoundDP = (x, dp) => {
        var multiplier = Math.pow(10, dp || 0);
        return Math.round(x * multiplier) / multiplier;
    }
}