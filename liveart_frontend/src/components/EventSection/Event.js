/**
 * @file Event.js - The source code of a single Event Card component
 * @author Eric Lin & Bailey Mills
 * 
 */   

import React, { useEffect, useState } from "react";
import "./EventSection.css"
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Event.css";
import moment from "moment";
import Icon from '@mdi/react';
import { mdiCalendar, mdiClockOutline } from '@mdi/js';

function Event(props){
    return (
      //target="_blank" rel="noopener noreferrer" -- open in new tab
      <Link to={"/auction/"+props.event.EventID} style={{ textDecoration: 'none', width: '420px' }} rel="noopener noreferrer">
        <Card className="box shadow p-2 mb-3 bg-body rounded event-card" >
            <div className="event-img-container">
                <Card.Img className="event-img" variant="top" src={props.event.EventURL}/>
                <Card.Img className="event-img-blur" variant="top" src={props.event.EventURL}/>
            </div>
            <div className="card-body2">
                <div class="event-card-item">
                    <Card.Img className="event-avatar-img rounded-circle" variant="left" src={props.event.AvatarURL} />
                </div>
                <div class="event-card-item">
                    <Card.Title className="eventtitle">{props.event.EventName}</Card.Title>
                    <Card.Text className="eventdescription">
                        <ul className="event-description-ul">
                            <li>{props.event.EventHostUsername}</li>
                            <li>
                                <Icon path={mdiCalendar}
                                    size={0.8}
                                    color="white"
                                />
                                {
                                    moment(props.event.StartTime).calendar(null, {
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
                                    color="white"
                                    className="horizontal-gap"
                                />
                                {moment(props.event.StartTime).format('h:mm A')}
                                {" - "}
                                {moment(props.event.EndTime).format('h:mm A')}
                            </li>
                        </ul>
                    </Card.Text>
                </div>
                <div className="eventtags">
                        <ul className="event-tags-ul">
                            <li className="event-tags-category">{props.event.CategoryName}</li>
                            {
                                props.event.EventTags.map((tag, index) => {
                                    return(
                                        <li>{tag.Name}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
            </div>
        </Card>
      </Link>
    );
  }

export default Event;