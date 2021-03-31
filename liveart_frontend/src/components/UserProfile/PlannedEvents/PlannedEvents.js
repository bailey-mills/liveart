import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./PlannedEvents.css";



function PlannedEvents(props){

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;
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
                    <h1>This is the Planned Events page of {currentUsername}</h1>
                </div>
                {/* This is UserProfile page for {props.match.params.username} */}
                {/* This is UserProfile page for {currentUsername} */}
                

            </div>
        </div>
    );

}

export default PlannedEvents;