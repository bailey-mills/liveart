import React from "react";
import Card from "react-bootstrap/Card";
import "./ItemCard.css";
import moment from "moment";
import Icon from '@mdi/react';
import { mdiCurrencyUsd, mdiCalendar, mdiClockOutline } from '@mdi/js';

const ItemCard = ({ item, itemType }) => {
    return (
        <Card className="itembox shadow p-2 mb-3 bg-body rounded item-card-formatting" >
        <div className="event-img-container">
            <Card.Img className="event-img" variant="top" src={item.ProductURL}/>
            <Card.Img className="event-img-blur" variant="top" src={item.ProductURL}/>
        </div>
            <div className="item-parent">
                <div class="itemcard-body2">
                    <Card.Img className="event-avatar-img rounded-circle" variant="left" src={item.AvatarURL} />
                </div>
                <div className="itemcard-body2">
                <Card.Title className="itemtitle">{item.Name}</Card.Title>
                <Card.Title className="itemtitle">{item.EventName}</Card.Title>
                <Card.Text className="itemdescription">
                    <ul>
                        <li>{item.EventHostUsername}</li>
                        <li>{item.ProductDescription}</li>
                        <li>
                        <Icon path={mdiCalendar}
                                    size={0.8}
                                    color="222"
                                />
                                {
                                    moment(item.StartTime).calendar(null, {
                                        sameDay: '[Today]',
                                        nextDay: '[Tomorrow]',
                                        nextWeek: 'MMMM D',
                                        lastDay: '[Yesterday]',
                                        lastWeek: 'MMMM D',
                                        sameElse: 'MMMM D'
                                    })
                                }
                                <Icon path={mdiClockOutline}
                                    size={0.8}
                                    color="222"
                                    className="horizontal-gap"
                                />
                                {moment(item.StartTime).format('h:mm A')}
                                {" - "}
                                {moment(item.EndTime).format('h:mm A')}
                        </li>
                        <li>
                            <Icon path={mdiCurrencyUsd} size={0.8} color="#222" />
                            {item.FinalPrice} (+${item.FinalPrice - item.BasePrice})
                        </li>
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
            </div>
        </Card>
        // </Link>
    );   
}

export default ItemCard;