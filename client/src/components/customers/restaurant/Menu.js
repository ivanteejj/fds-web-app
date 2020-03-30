import React, {useState} from 'react'
import {
    Button,
    Header,
    Rating,
    Icon,
    Item,
    Label,
    Divider,
    Container
} from 'semantic-ui-react'

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
                        {food.map(item => {
                            return (
                                <>
                                <Item>
                                    <Item.Content>
                                        <Item.Header as={'a'}>{item.fname}</Item.Header>
                                        <div>
                                            <Rating defaultRating={item.rating} maxRating={5} icon={'star'} disabled/>
                                            {item.reviews &&
                                                <Label size={"small"} onClick={() => {showReview(item)}}>
                                                    view reviews
                                                </Label>}
                                        </div>
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