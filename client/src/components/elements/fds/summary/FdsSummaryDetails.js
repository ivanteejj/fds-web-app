import React from "react"
import {Header, Statistic} from "semantic-ui-react";

export default function FdsSummaryDetails({stats}) {
    return (
        <>
            <Header as={'h2'} textAlign={'center'} color={'grey'}>Statistics</Header>
            <Statistic.Group widths={'three'}>
                <Statistic>
                    <Statistic.Value>{stats.totalnewcustomers}</Statistic.Value>
                    <Statistic.Label>New Customers</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{stats.totalorders}</Statistic.Value>
                    <Statistic.Label>Orders</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>${stats.totalcost}</Statistic.Value>
                    <Statistic.Label>Revenue</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </>
    )
}