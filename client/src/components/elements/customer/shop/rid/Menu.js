import React, {useState} from 'react'
import {
    Button,
    Header,
    Rating,
    Icon,
    Item,
    Label,
    Divider,
    Container, Grid
} from 'semantic-ui-react'
import Utils from "../../../../commons/Utils";

export default function Menu({addCart, menu}) {
    const [viewReview, setViewReview] = useState({});

    const showReview = (item) => {
        if (item === viewReview) {
            setViewReview({})
        } else {
            setViewReview(item)
        }
    }

    return (
        <>
        {Object.entries(menu).map(([cat, food]) => {
            return (
                <span>
                    <Item.Group>
                        <Header as={'h2'}>{cat}</Header>
                        {food.map((item, idx) => {
                            return (
                                <>
                                <Item key={idx}>
                                    <Item.Content>
                                        <Item.Header as={'a'}>{item.fname}</Item.Header>
                                        <Grid columns={2}>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <div>
                                                        <Rating defaultRating={item.rating} maxRating={5} icon={'star'} disabled/>
                                                        {item.reviews &&
                                                        <Label size={"small"} onClick={() => {showReview(item)}}>
                                                            view reviews
                                                        </Label>}
                                                    </div>
                                                </Grid.Column>

                                                <Grid.Column textAlign={'right'}>
                                                    <h3>{`$${Utils.roundDecimalPlace(item.price, 1)}`}</h3>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Item.Extra>
                                            <Button primary floated='right'
                                                    onClick={() => addCart(item.fid, item.fname, item.price, item.qty_left)}
                                            >
                                                Order
                                                <Icon name='right chevron' />
                                            </Button>
                                            <Label>{`${item.qty_left} left`}</Label>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>

                                {viewReview === item &&
                                <Container>
                                    {item.reviews && <> <Divider/>
                                        <h4>Food Reviews</h4>
                                    </>}
                                    {item.reviews && item.reviews.map(review => {
                                        return (
                                            <div>
                                                <text style={{fontStyle: 'italic'}}>{review}</text>
                                            </div>
                                        )
                                    })}
                                    {item.reviews && <Divider/>}
                                </Container>}
                                </>
                            )
                        })}
                    </Item.Group>
                </span>
            )
        })}
        </>
    )
}