import React from "react";
import Card from "react-bootstrap/Card";
import "./ItemCard.css";
import Icon from '@mdi/react';
import { mdiCurrencyUsd } from '@mdi/js';

const ItemCard = ({ item, itemType }) => {
    return (
        <Card className="itembox shadow p-2 mb-3 bg-body rounded" >
            <div class="event-img-container">
                <Card.Img className="event-img" variant="top" src={item.ProductURL} />
            </div>

            <div className="itemcard-body2">
                <Card.Title className="itemtitle">{item.Name}</Card.Title>
                <Card.Text className="itemdescription">
                    <ul>
                        <li>{item.ProductDescription}</li>
                        <li>
                            <Icon path={mdiCurrencyUsd} size={0.8} color="#222" />
                            {item.FinalPrice} (+${item.FinalPrice - item.BasePrice})
                        </li>
                        <li>Artist: {item.EventHostUsername}</li>
                        <li>Event: {item.EventName}</li>
                    </ul>
                    {/* {id} */}
                </Card.Text>
                <div className="itemtags">
                    <ul className="item-tags">
                    {
                        item.Tags && item.Tags.map((tag, index)=>{
                            return(
                                <li>{tag.Name}</li>
                            );
                        })
                    }
                    </ul>
                </div>
            </div>
        </Card>
        // </Link>
    );   
}

export default ItemCard;