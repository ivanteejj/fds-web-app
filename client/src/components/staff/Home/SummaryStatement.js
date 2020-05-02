import React from "react"
import {
    Card,
    Grid, Header,
    Icon, Statistic, Segment,
    Table
} from "semantic-ui-react";

export default function SummaryStatement({stats}) {
    return (
        <>
            <h2>Statistics</h2>
            <Grid>
                <Grid.Row>
                <Grid.Column width={6} textAlign={"left"}>
                    <Card>
                        <Card.Content>
                            <Card.Header><Icon name={'star'} color={'yellow'}/>Top Sales Items!</Card.Header>
                            <Card.Description>
                                <Table basic={"very"} celled collapsing>
                                    <Table.Header>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Item</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                    </Table.Header>

                                    <Table.Body>
                                        {stats.topFavorites && stats.topFavorites.map((item, idx) => (
                                            <Table.Row>
                                                <Table.Cell>{idx+1}</Table.Cell>
                                                <Table.Cell>{item.fname}</Table.Cell>
                                                <Table.Cell>{item.qty_sold}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>

                <Grid.Column width={8} textAlign={'center'}>
                    <Header as={'a'}>Performance</Header>
                    <Segment padded horizontal textAlign={'center'}>
                        <Statistic.Group widths={'two'} size='small'>
                            <Statistic>
                                <Statistic.Value>{stats.totalNumberOfOrders}</Statistic.Value>
                                <Statistic.Label>Orders</Statistic.Label>
                            </Statistic>
                            <Statistic>
                                <Statistic.Value>${stats.totalProfit}</Statistic.Value>
                                <Statistic.Label>Revenue</Statistic.Label>
                            </Statistic>
                        </Statistic.Group>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}