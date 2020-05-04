import React from "react"
import {Card} from "semantic-ui-react";
import DateTimeUtils from "../../../../commons/DateTimeUtils";

const OrderStatus = ({o}) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>Order Status</Card.Header>
                <Card.Description>Order placed: {DateTimeUtils.stringtifyPrettyDT(o.dt_order_placed)}</Card.Description>
                {o.dt_rider_departs !== null
                && <Card.Description>{`Rider heading to restaurant: ${DateTimeUtils.stringtifyPrettyDT(o.dt_rider_departs)}`}</Card.Description>
                }
                {o.dt_rider_arrives_rest !== null
                && <Card.Description>{`Rider arrives restaurant: ${DateTimeUtils.stringtifyPrettyDT(o.dt_rider_arrives_rest)}`}</Card.Description>
                }
                {o.dt_rider_departs_rest !== null
                && <Card.Description>{`Rider departs restaurant: ${DateTimeUtils.stringtifyPrettyDT(o.dt_rider_departs_rest)}`}</Card.Description>
                }
                {o.dt_order_delivered !== null
                && <Card.Description>{`Order received: ${DateTimeUtils.stringtifyPrettyDT(o.dt_order_delivered)}`}</Card.Description>
                }
            </Card.Content>
        </Card>
    )
}

export default OrderStatus