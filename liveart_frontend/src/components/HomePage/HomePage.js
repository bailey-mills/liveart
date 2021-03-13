import React from "react";
import Slideshow from "../SlideShow/__slideshow";
import Navbar from "../Navbar/Navbar";
import '../Navbar/Navbar.css';
import '../../index.css'
import EventSection from "../EventSection/EventSection"
import events from "../../Assets/sampleEvents.json"



class EventsPage extends React.Component {


    render(){

        return(
            <React.StrictMode>

                <Navbar />
                <Slideshow />
                <hr/>
                <h1> Events You Subscribed</h1>
                <EventSection events={events}/>
                <hr/>
                <h1> Events You Might be interested in</h1>
                <EventSection events={events}/>       
            </React.StrictMode>
        );
    }
}


export default EventsPage;