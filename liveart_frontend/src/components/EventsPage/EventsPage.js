/**
 * @file EventsPage.js - The source code of displaying all events based on certain item tags component
 * @author Eric Lin & Bailey Mills
 * 
 */   

import React, {useState, useEffect} from "react";
import Events from "../../Assets/sampleEvents.json";
//import Tags from "../../Assets/TagSample.json";
import EventSection from "../EventSection/EventSection";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function EventsPage(props){
    let tagName = props.match.params.tagName;
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/event/getByTag/' + tagName).then(res=>{
            console.log(res.data);
            if(res.status === 200)
            {
                setEvents(res.data);
            }
        });
    },[]);
    
    return(
        <div>
            <Navbar/>
            <div className="home-page-content">
                <h2 style={{textAlign:"center", marginTop:"20px", marginBottom:"10px"}}>{tagName}</h2>
                <EventSection events={events} eventClass="event-section-tall"/>
            </div>
        </div>
    );
    
}


export default EventsPage;