import React, {Component} from "react"
import moment from "moment"

export default class DateTimeUtils extends Component {

    // input should be in standard datetime format
    // eg: 2018-07-24T03:33:51.000Z
    // output string in dd/MM/YYYY h:mm a
    static stringtifyPrettyDT(datetime) {
        return moment(datetime).format("Do MMMM YYYY h:mm:ssa").toString()
    }
}