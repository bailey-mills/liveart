import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./SubsEvents.css";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Event from "../../EventSection/Event"
import axios from "axios";


function SubsEvents(props){

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');
    if(currentUsername===null)
    {
        //jump to login page
    }

    const [events, setEvents] = useState([]);
    useEffect(()=>{
        
        axios.get('http://localhost:5000/event/getSubscribed/'+currentUsername).then(res=>{
            if(res.status!==200){
                alert("Can't connect to the backend server");
                return;
            }
    
            setEvents(res.data);
            //console.log("from backend", userinfo);
        })
        
    },[]);


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
                            events.ActiveEvents && events.ActiveEvents.map((event, index) => {

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
                            events.UpcomingEvents && events.UpcomingEvents.map((event, index) => {

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
                            events.PastEvents && events.PastEvents.map((event, index) => {
                                return(
                                    <Event event={event} />
                                );
                            })
                        }
                        </div>
                    </div>
                                                          
                </div>
                

            </div>
        </div>
    );

}


export default SubsEvents;