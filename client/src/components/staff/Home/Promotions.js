import React from "react"
import {
    Table
} from "semantic-ui-react";

export default function Promotions({promotions}) {
    return (
        <>
            <Table celled textAlign={"center"} color={'pink'}>
                <Table.Header>
                    <Table.HeaderCell width={2}>#</Table.HeaderCell>
                    <Table.HeaderCell width={5}>Details</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Start Date</Table.HeaderCell>
                    <Table.HeaderCell width={4}>End Date</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Duration (in hrs)</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Avg Orders</Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    {promotions.map(promo => (
                        <Table.Row>
                            <Table.Cell>{promo.promoid}</Table.Cell>
                            <Table.Cell>{promo.details}</Table.Cell>
                            <Table.Cell>{promo.dt_start}</Table.Cell>
                            <Table.Cell>{promo.dt_end}</Table.Cell>
                            <Table.Cell>{promo.duration}</Table.Cell>
                            <Table.Cell>{promo.avgOrders}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}