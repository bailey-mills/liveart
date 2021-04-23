/**
 * @file PlannedEvents.js - The source code of the related events for the current user sub-page component
 * @author Eric Lin & Bailey Mills
 * 
 */ 
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./PlannedEvents.css";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Event from "../../EventSection/Event";
import axios from "axios";

function PlannedEvents(props){

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');
    if(currentUsername===null)
    {
        //jump to login page
    }

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        
        axios.get(process.env.REACT_APP_SERVER + '/event/getPlanned/'+currentUsername).then(res=>{
            if(res.status!==200){
                alert("Can't connect to the backend server");
                return;
            }
    
            setEvents(res.data);
            //console.log("from backend", userinfo);
        })
        
    },[]);

    const activeEvents = events.ActiveEvents && events.ActiveEvents.length <= 0 ? "" :
        <div>
            <h4 style={{textAlign:"center", paddingTop:"15px"}}>Active Events</h4>
            <div className="eventBody">
                <div className="event-section">
                {
                    events.ActiveEvents && events.ActiveEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                    })
                }
                </div>
            </div>
        </div>

    const upcomingEvents = events.UpcomingEvents && events.UpcomingEvents.length <= 0 ? "" :
        <div>
            <h4 style={{textAlign:"center", paddingTop:"15px"}}>Upcoming Events</h4>
            <div className="eventBody">
                <div className="event-section">
                {
                    events.UpcomingEvents && events.UpcomingEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                    })
                }
                </div>
            </div>
        </div>
        
    const pastEvents = events.PastEvents && events.PastEvents.length <= 0 ? "" :
        <div>
            <h4 style={{textAlign:"center", paddingTop:"15px"}}>Past Events</h4>
            <div className="eventBody">
                <div className="event-section">
                {
                    events.PastEvents && events.PastEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                    })
                }
                </div>
            </div>
        </div>

    return(
        <div>
            <Navbar />
            
            <div className="main-body">
                <Sidebar username={currentUsername}/>
                <div className="content-body" style={{paddingBottom:"10px"}}>
                    <div className="home-page-content">
                        {activeEvents}
                        {upcomingEvents}
                        {pastEvents}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PlannedEvents;