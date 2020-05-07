import React, {useState, useReducer, useEffect} from "react"
import {Card, Grid, Header, Item, Icon, Table, Button} from "semantic-ui-react";
import Utils from "../../../commons/Utils";
import MenuItems from "../../../elements/rstaff/menu/MenuItems";
import PopupEditFood from "../../../elements/rstaff/menu/PopupEditFood";
import PopupAddFood from "../../../elements/rstaff/menu/PopupAddFood";
import axios from "axios";
import DateTimeUtils from "../../../commons/DateTimeUtils";

const fakeMenu = {
    data: [
        {fid: 100, fname: "Regular Milk Tea", rid: 1000, price: 3.5, category: "Beverages", daily_limit: 120, daily_sold: 20},
        {fid: 101, fname: "Avocado Melon Tea", rid: 1000, price: 2.9, category: "Beverages", daily_limit: 50, daily_sold: 30},
        {fid: 102, fname: "Brown Sugar Fries", rid: 1000, price: 9.70, category: "Western", daily_limit: 50, daily_sold: 20},
        {fid: 103, fname: "Eww Eel Bento", rid: 1000, price: 25.90, category: "Japanese", daily_limit: 20, daily_sold: 5},
        {fid: 104, fname: "Yaya Papaya Macaron", rid: 1000, price: 10.9, category: "Dessert", daily_limit: 30, daily_sold: 10},
        {fid: 105, fname: "Creme Brulee", rid: 1000, price: 5.9, category: "Dessert", daily_limit: 20, daily_sold: 10}
    ]
}

const fakeCategories = {
    data: [
        'Local',
        'Asian',
        'Chinese',
        'Japanese',
        'Western',
        'Italian',
        'Vegetarian',
        'Fast Food',
        'Breakfast',
        'Desserts',
        'Beverage'
    ]
}

function top5Items(data) {
    data.sort((a,b) => b.daily_sold - a.daily_sold);
    return data.slice(0,5);
}

export default function Menu({userid, rid}) {
    const [menu, setMenu] = useState([])
    const [topItems, setTopItems] = useState([])
    const [categories, setCategories] = useState([])

    const [showPopup, setShowPopup] = useReducer(Utils.reducer, {
        addFood: false,
        editFood: false,
        item: null
    })

    const [test, setTest] = useState(null)

    const openPopup = (type, boo, item) => {
        setShowPopup({type: "item", payload: item})
        setShowPopup({type: type, payload: boo})
    }

    const closePopup = (type, boo) => {
        setShowPopup({type: "item", payload: null})
        setShowPopup({type: type, payload: boo})
    }

    const submitEditFood = async (item) => {
        console.log("fid:" +  item.fid)

        await axios
            .post('/staff/updateFood/', {
                    fid: item.fid,
                    fname: item.fname,
                    price: item.price,
                    category: item.category,
                    daily_limit: item.daily_limit
                })
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });

        await axios
            .get('/staff/menu/getFoodForRestaurantPage/', {
                params: {
                    rid: rid
                }})
            .then( function(response) {
                setTopItems(top5Items(response.data.slice()))
                setMenu(Utils.groupBy(response.data, "category"))
            })
        closePopup("editFood", false)

    }

    const submitAddFood = async (item) => {
        await axios
            .post('/staff/addFood/', {
                    rid: rid,
                    fname: item.fname,
                    price: item.price,
                    category: item.category,
                    daily_limit : item.daily_limit

                })
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });

        await axios
            .get('/staff/menu/getFoodForRestaurantPage/', {
                params: {
                    rid: rid
                }})
            .then( function(response) {
                setTopItems(top5Items(response.data.slice()))
                setMenu(Utils.groupBy(response.data, "category"))
            })
        closePopup("addFood", false)
    }

    const submitDeleteFood = async (item) => {
        await axios
            .delete('/staff/deleteFood/', {
                params: {
                    fid: item.fid
                }})
            .then( (resp) => {
                console.log(resp);
            }, (error) => {
                console.log(error);
            });

        await axios
            .get('/staff/menu/getFoodForRestaurantPage/', {
                params: {
                    rid: rid
                }})
            .then( function(response) {
                setTopItems(top5Items(response.data.slice()))
                setMenu(Utils.groupBy(response.data, "category"))
            })
        closePopup("editFood", false)
    }

    useEffect(() => {
        (async() => {
            let user = userid
            let rest_id = rid

            const allRelevantFood = await axios
                .get('/staff/menu/getFoodForRestaurantPage/', {
                    params: {
                        rid: rid
                    }})
                .then( function(response) {
                    setTopItems(top5Items(response.data.slice()))
                    setMenu(Utils.groupBy(response.data, "category"))
                })

        })()
    }, [])

    useEffect(() => {
        setCategories(fakeCategories.data)
    }, [showPopup.editFood])

    return (
        <>
            <Grid relaxed>
                <Grid.Column width={1}/>
                <Grid.Column width={3}>
                    <Header as={'h1'}>{`Menu`}</Header>

                    <Card>
                        <Card.Content>
                            <Card.Header><Icon name={'fire'}/>Hot Items!<Icon name={'fire'}/></Card.Header>
                            <Card.Description>
                                <Table basic={"very"} celled collapsing>
                                    <Table.Header>
                                        <Table.HeaderCell>#</Table.HeaderCell>
                                        <Table.HeaderCell>Item</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                    </Table.Header>

                                    <Table.Body>
                                        {topItems.map((item, idx) => (
                                            <Table.Row>
                                                <Table.Cell>{idx+1}</Table.Cell>
                                                <Table.Cell>{item.fname}</Table.Cell>
                                                <Table.Cell>{item.daily_sold}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                        </Card.Description>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Content>
                            <Card.Header>Categories</Card.Header>
                            <Card.Description>
                                <Item>
                                    {Object.entries(menu).map(([cat, food]) => (
                                        <Item.Description>{cat}</Item.Description>
                                    ))}
                                </Item>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                    <Item.Extra>** Daily Sold reflects quantities sold as of today</Item.Extra>
                </Grid.Column>

                <Grid.Column width={8} textAlign={"left"}>
                    <MenuItems menu={menu} openPopup={openPopup}/>
                </Grid.Column>

                <Grid.Column width={3}>
                    <Button floated={'center'} size="medium"
                            content={'Add New Food'}
                            color={'teal'}
                            onClick={() => openPopup("addFood", true, null)}
                    />
                </Grid.Column>
            </Grid>

            {showPopup.editFood && showPopup.item &&
                <PopupEditFood closePopup={closePopup}
                               item={showPopup.item} categories={categories}
                               submitEditFood={submitEditFood} submitDeleteFood={submitDeleteFood}
                />
            }

            {showPopup.addFood &&
                <PopupAddFood closePopup={closePopup}
                              categories={categories}
                              submitAddFood={submitAddFood}
                              rid={rid}
                />
            }

            {rid && <text>{rid}</text>}
        </>
    )
}