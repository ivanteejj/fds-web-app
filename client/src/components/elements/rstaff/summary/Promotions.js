import React from "react"
import {
    Table,
    Button
} from "semantic-ui-react";
import moment from "moment"
import Utils from "../../../commons/Utils";
import DateTimeUtils from "../../../commons/DateTimeUtils";

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
                    <Table.HeaderCell width={3}>Duration (in days)</Table.HeaderCell>
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
                            <Table.Cell>{DateTimeUtils.stringtifyPromoDT(promo.start_datetime)}</Table.Cell>
                            <Table.Cell>{DateTimeUtils.stringtifyPromoDT(promo.end_datetime)}</Table.Cell>
                            <Table.Cell>{promo.duration}</Table.Cell>
                            <Table.Cell>{Utils.roundDecimalPlace(promo.avgorders, 2)}</Table.Cell>
                            <Table.Cell>{promo.promo_max_num_redemption ? promo.promo_max_num_redemption : "NA"}</Table.Cell>
                            {moment().isBefore(promo.end_datetime) ? (
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