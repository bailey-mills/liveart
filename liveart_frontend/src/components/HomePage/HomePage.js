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
    },[]);

    return(
        <React.StrictMode>

            <Navbar />
            <Slideshow />
            <hr/>
            <h1> Events You Subscribed</h1>
            <div className="eventBody">
                {/* {getData()} */}
                <EventSection events={subscribedEvents}/>
            </div>
            <hr/>
            <h1> Events You Might be interested in</h1>
            <EventSection events={recommendedEvents}/>  
            <Footer/>     
        </React.StrictMode>
    );

}

export default EventsPage;