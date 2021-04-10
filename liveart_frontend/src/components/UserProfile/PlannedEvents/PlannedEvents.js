import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./PlannedEvents.css";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Event from "../../EventSection/Event"

function PlannedEvents(props){

    const sample = {
        "PastEvents": [{
            "EventID": 551,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-04-22T18:00:00.000Z",
            "EndTime": "2021-04-22T19:22:00.000Z",
            "CategoryID": 2,
            "CategoryName": "Sculpture",
            "EventHostUsername": "Trista_Kastor_252",
            "EventTags": [
                {
                    "ID": 3,
                    "Name": "Abstraction"
                },
                {
                    "ID": 4,
                    "Name": "Impressionism"
                }
            ]
        }],
        "ActiveEvents": [{
            "EventID": 551,
            "EventName": "Sculptures for auction",
            "StartTime": "2021-04-22T18:00:00.000Z",
            "EndTime": "2021-04-22T19:22:00.000Z",
            "CategoryID": 2,
            "CategoryName": "Sculpture",
            "EventHostUsername": "Trista_Kastor_252",
            "EventTags": [
                {
                    "ID": 3,
                    "Name": "Abstraction"
                },
                {
                    "ID": 4,
                    "Name": "Impressionism"
                }
            ]
        }],
        "UpcomingEvents": [
            {
                "EventID": 551,
                "EventName": "Sculptures for auction",
                "StartTime": "2021-04-22T18:00:00.000Z",
                "EndTime": "2021-04-22T19:22:00.000Z",
                "CategoryID": 2,
                "CategoryName": "Sculpture",
                "EventHostUsername": "Trista_Kastor_252",
                "EventTags": [
                    {
                        "ID": 3,
                        "Name": "Abstraction"
                    },
                    {
                        "ID": 4,
                        "Name": "Impressionism"
                    }
                ]
            },
            {
                "EventID": 551,
                "EventName": "Sculptures for auction",
                "StartTime": "2021-04-22T18:00:00.000Z",
                "EndTime": "2021-04-22T19:22:00.000Z",
                "CategoryID": 2,
                "CategoryName": "Sculpture",
                "EventHostUsername": "Trista_Kastor_252",
                "EventTags": [
                    {
                        "ID": 3,
                        "Name": "Abstraction"
                    },
                    {
                        "ID": 4,
                        "Name": "Impressionism"
                    }
                ]
            }
        ]
    };

    const events = sample.UpcomingEvents;


    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');
    if(currentUsername===null)
    {
        //jump to login page
    }


    return(
        <div>
            <Navbar />
            
            <div className="main-body">
            <Sidebar username={currentUsername}/>
                <div className="content-body">
                    <div>
                        <h2>Ongoging Events</h2>
                        <div className="planned-events">
                        {
                            sample.ActiveEvents.map((event, index) => {

                                return(
                                    
                                    <Event event={event} />
                                );
                            })
                        }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h2>Upcoming Events</h2>
                        <div className="planned-events">
                        {
                            sample.UpcomingEvents.map((event, index) => {

                                return(
                                    
                                    <Event event={event} />
                                );
                            })
                        }
                        </div>
                    </div>
                    <hr />
                    <div>
                        <h2>Past Events</h2>
                        <div className="planned-events">
                        {
                            sample.PastEvents.map((event, index) => {
                                return(
                                    <Event event={event} />
                                );
                            })
                        }
                        </div>
                    </div>
                
                    
                    
                    

                </div>
                {/* This is UserProfile page for {props.match.params.username} */}
                {/* This is UserProfile page for {currentUsername} */}
                

            </div>
        </div>
    );

}

export default PlannedEvents;