import React, {useState, useEffect}from "react";
import Slideshow from "../SlideShow/__slideshow";
import Navbar from "../Navbar/Navbar";
import '../Navbar/Navbar.css';
import '../../index.css'
import EventSection from "../EventSection/EventSection"
// import events from "../../Assets/sampleEvents.json"
import "./HomePage.css";
import axios from "axios";
import Footer from "../Footer/Footer";


function EventsPage(){

    const [subscribedEvents, setSubscribedEvents] = useState([]);
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [slideshowEvents, setSlideshowEvents] = useState([]);
    
    let username = localStorage.getItem('user') || "";

    useEffect(()=>{
        // Subscribed Events
        axios.get(process.env.REACT_APP_SERVER + '/event/getSubscribed/' + username).then(res=>{
            if(res.status === 200)
            {
                setSubscribedEvents(res.data.UpcomingEvents);
            }
        });

        // Recommended Events
        axios.get(process.env.REACT_APP_SERVER + '/event/getRecommended/' + username).then(res=>{
            if(res.status === 200)
            {
                setRecommendedEvents(res.data);
            }
        });

        // Slideshow Events
        axios.get(process.env.REACT_APP_SERVER + '/event/getSlideshow/').then(res=>{
            if(res.status === 200)
            {
                setSlideshowEvents(res.data);
            }
        });
    },[]);

    return(
        <React.StrictMode>
            <Navbar />
            <div className="home-page-content">
                <Slideshow events={slideshowEvents} />
                <h2 style={{textAlign:"center", marginTop:"35px"}}>Subscriptions</h2>
                <div className="eventBody">
                    {/* {getData()} */}
                    <EventSection events={subscribedEvents} eventClass="event-section"/>
                </div>
                <h2 style={{textAlign:"center", marginTop:"35px"}}>Events You Might be Interested In</h2>
                <EventSection events={recommendedEvents} eventClass="event-section-tall"/>
            </div>
            <Footer/>     
        </React.StrictMode>
    );

}

export default EventsPage;