import React from "react"
import {Header, Statistic} from "semantic-ui-react";

export default function FdsSummaryDetails({stats}) {
    return (
        <>
            <Header as={'h2'} textAlign={'center'} color={'grey'}>Statistics</Header>
            <Statistic.Group widths={'three'}>
                <Statistic>
                    <Statistic.Value>{stats.totalNewCustomers}</Statistic.Value>
                    <Statistic.Label>New Customers</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{stats.totalNumberOfOrders}</Statistic.Value>
                    <Statistic.Label>Orders</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>${stats.totalCost}</Statistic.Value>
                    <Statistic.Label>Revenue</Statistic.Label>
                </Statistic>
            </Statistic.Group>
        </>
    )
}