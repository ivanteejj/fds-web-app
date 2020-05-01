import React from "react"
import {Header, Card} from "semantic-ui-react";

export default function SummaryDetails({stats}) {
    const items = [
        {
            header: 'Total Working Hours',
            description: <h2>{stats.total_hours}</h2>
        },
        {
            header: 'Total Orders Delivered',
            description: <h2>{stats.total_orders_delivered}</h2>
        },
        {
            header: 'Total Salary',
            description: <h2>${stats.total_salary}</h2>
        }
    ]

    return (
        <>
            <Header as={'h2'} textAlign={'center'}>Statistics</Header>
            <Card.Group centered items={items}/>
        </>
    )
}