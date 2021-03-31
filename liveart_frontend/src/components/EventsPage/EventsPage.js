import React, {useState, useEffect} from "react";
import Events from "../../Assets/sampleEvents.json";
import Tags from "../../Assets/TagSample.json";
import EventSection from "../EventSection/EventSection";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

function EventsPage(){

    let TagsDuplicate = Tags;
    let typee="";
    let filteredEvents = [];
    const [displayevents, setDisplayevents] = useState([]);
    const [selectedtagname, setSelectedtagname] = useState("");

    // const [tags, setEvents] = useState([]);

    // useEffect(()=>{
    //     axios.get('http://localhost:5000/all-tags').then(res=>{
    //         console.log("return code: " +res.status);
    //         if(res.status!==200)
    //         {
    //             alert("Can't connect to the backend");
    //             return;
    //         }
    //         // events = res.data[0];
    //         setEvents(res.data);
    //     })
    // },[]);
    
    TagsDuplicate.map((tag, index) => {
        tag["label"] = tag["tag"];
    });


    function selectHandler(e){

        // setType(e.id);
        typee = e.id;
        setSelectedtagname(e.tag);

        filter();
        console.log("filtered",filteredEvents);

    }

    function filter(){
        filteredEvents = [];
        
        Events.map((event, index) => {
            //console.log(event.type,type);
            if(event.type === typee)
            {
                console.log("match");
                filteredEvents.push(event);
            }
        });
        setDisplayevents(filteredEvents);
    }
    
    
    return(
        <div>
            <Navbar/>
            <br/>
            <br/>
            <Select options={TagsDuplicate}  value={selectedtagname} filterOption={false} isSearchable={true} placeholder="--- Select a tag ---" onChange={selectHandler}/>
            <h2>Current Selected Tag: {selectedtagname}</h2>
            <EventSection events={displayevents}/>   
        </div>
    );
    
}


export default EventsPage;