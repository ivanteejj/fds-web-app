import React from "react";
import {
    Divider,
    Rating,
    Card,
    Icon
} from "semantic-ui-react";
import "../../../../stylesheets/Popup.css"

export default function PopupViewReview({hidePopup, review}) {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={() => hidePopup("viewReview", false)}>x</span>
                <>
                    <h1>Your Review</h1>
                    <Divider/>

                    <h3>Rider Review</h3>
                    <Card fluid>
                        <Card.Content>
                            <h3><Icon name='user'/>{review.rider.riderid}</h3>
                            <Rating defaultRating={review.rider.rating} maxRating={5} icon={'star'} disabled/>
                            <Card.Description>{review.rider.review}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Divider/>
                    <h3>Food Review</h3>
                    <Card fluid>
                    {review.foodrating.map(item => (
                        <>
                            <Card.Content>
                                <h3>{item.fname}</h3>
                                <Rating defaultRating={item.rating} maxRating={5} icon={'star'} disabled/>
                                <Card.Description>{item.review}</Card.Description>
                            </Card.Content>
                        </>
                    ))}
                    </Card>
                </>
            </div>
        </div>
    )
}
