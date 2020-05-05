import React from "react"
import {
    Table,
    Button
} from "semantic-ui-react";
import moment from "moment"

const datetime_format = "DD/MM/YYYY HH:mm:ss";
export default function Promotions({promotions, openPromo}) {
    return (
        <>
            <Table celled textAlign={"center"} color={'pink'}>
                <Table.Header>
                    <Table.HeaderCell width={2}>#</Table.HeaderCell>
                    <Table.HeaderCell width={5}>Details</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Min Cost</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Disc limit</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Start Date</Table.HeaderCell>
                    <Table.HeaderCell width={4}>End Date</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Duration (in hrs)</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Avg Orders</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Max redemption</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Edit?</Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    {promotions.map(promo => (
                        <Table.Row>
                            <Table.Cell>{promo.pid}</Table.Cell>
                            <Table.Cell>{promo.promo_details_text}</Table.Cell>
                            <Table.Cell>{`$${promo.promo_min_cost > 0 ? promo.promo_min_cost : 0}`}</Table.Cell>
                            <Table.Cell>{`$${promo.promo_max_discount_limit > 0 ? promo.promo_max_discount_limit : 0}`}</Table.Cell>
                            <Table.Cell>{promo.start_datetime}</Table.Cell>
                            <Table.Cell>{promo.end_datetime}</Table.Cell>
                            <Table.Cell>
                                {moment(promo.end_datetime, datetime_format).diff(moment(promo.start_datetime, datetime_format), 'hour')}
                            </Table.Cell>
                            <Table.Cell>{promo.avgorders}</Table.Cell>
                            <Table.Cell>{promo.promo_max_num_redemption ? promo.promo_max_num_redemption : "NA"}</Table.Cell>
                            {moment().isBefore(moment(promo.end_datetime, datetime_format)) ? (
                                <Table.Cell>
                                    <Button content={'Edit'}
                                            onClick={() => openPromo("editPromo", true, promo)}
                                            color={'orange'}
                                    />
                                </Table.Cell>
                            ) : (<Table.Cell>No</Table.Cell>)}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
}