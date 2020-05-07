import React, {Component} from "react"
import moment from "moment"

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

export default class DateTimeUtils extends Component {

    // input should be in standard datetime format
    // eg: 2018-07-24T03:33:51.000Z
    // output string in dd/MM/YYYY h:mma
    static stringtifyPrettyDT(datetime) {
        return moment(datetime).format("Do MMMM YYYY h:mm:ssa").toString()
    }

    static stringtifyPromoDT(datetime) {
        return moment(datetime).format("DD/MM/YYYY HH:mm:ss").toString()
    }

    // stringtify month and year
    static stringtifyPeriod(month, year) {
        return months[month - 1] + " "  + year
    }

    // expects month and year variables name to be standardized as follows
    // returns an array with additional period field
    static formatDataPeriod = (data) => {
        return data.map(x => {
            return {...x, period: DateTimeUtils.stringtifyPeriod(x.month, x.year)}
        })
    }
}