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

    // round x to specified dp places
    static roundDecimalPlace = (x, dp) => {
        return Number.parseFloat(x).toFixed(dp)
    }
}