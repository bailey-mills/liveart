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

    const [events, setEvents] = useState([]);
    // let events = [];

    useEffect(()=>{
        axios.get('http://localhost:5000/event/getRecommended').then(res=>{
            console.log("return code: " +res.status);
            if(res.status!==200)
            {
                alert("Can't connect to the backend");
                return;
            }
            // events = res.data[0];
            setEvents(res.data);
        })
    },[]);


    // function getData(){
    //     console.log("getdata");
    //     axios.get('http://localhost:5000/event/getRecommended').then(res=>{
    //         console.log("return code: " +res.status);
    //         if(res.status!==200)
    //         {
    //             alert("Can't connect to the backend");
    //             return;
    //         }

    //         useEffect(() => setA(2), [])
    //         // events = res.data[0];
    //         setEvents(res.data[0]);
    //         console.log("json: "+events);
    //     });
    // }



        return(
            <React.StrictMode>

                <Navbar />
                <Slideshow />
                <hr/>
                <h1> Events You Subscribed</h1>
                <div className="eventBody">
                    {/* {getData()} */}
                    <EventSection events={events}/>
                </div>
                <hr/>
                <h1> Events You Might be interested in</h1>
                <EventSection events={events}/>  
                <Footer/>     
            </React.StrictMode>
        );

}


export default EventsPage;