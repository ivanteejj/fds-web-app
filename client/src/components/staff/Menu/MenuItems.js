import React from "react"
import {
    Button,
    Card,
    Divider,
    Grid,
    Header,
    Item,
    Table,
    Icon
} from "semantic-ui-react";

export default function MenuItems({menu, openPopup}) {

    return (
        <>
            {Object.entries(menu).map(([cat, food]) => (
                <>
                    <Header as={'h1'}>{cat}</Header>
                    <Divider/>

                    {food.map(item => (
                        <Card fluid>
                            <Card.Content>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={10}>
                                            <h2>
                                                <Icon name={'circle'} size={'small'}
                                                      color={item.daily_limit > item.daily_sold ? "green" : "red"}
                                                />
                                                {item.fname}
                                            </h2>
                                        </Grid.Column>

                                        <Grid.Column width={4}>
                                            <Button floated={'right'} size="small"
                                                    content={'Edit Details'}
                                                    color={'orange'}
                                                    onClick={() => openPopup("editFood", true, item)}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                                <Item.Description>{item.daily_limit > item.daily_sold ? "Available" : "Sold Out"}</Item.Description>

                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={12}>
                                           <Table basic={"very"} celled collapsing>
                                               <Table.Header>
                                                   <Table.Row>
                                                       <Table.HeaderCell>Daily Limit</Table.HeaderCell>
                                                       <Table.HeaderCell>Daily Sold**</Table.HeaderCell>
                                                   </Table.Row>
                                               </Table.Header>

                                               <Table.Body>
                                                   <Table.Row>
                                                       <Table.Cell>{item.daily_limit}</Table.Cell>
                                                       <Table.Cell>{item.daily_sold}</Table.Cell>
                                                   </Table.Row>
                                               </Table.Body>
                                           </Table>
                                        </Grid.Column>

                                        <Grid.Column width={2}>
                                            <h1>{`$${item.price}`}</h1>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </Card.Content>
                        </Card>
                    ))}
                </>
            ))}
        </>
    )
}