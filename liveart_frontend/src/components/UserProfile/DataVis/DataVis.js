/**
 * @file DataVis.js - The source code of the data visualization sub-page component 
 * @author Eric Lin & Bailey Mills
 * 
 */ 
import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import AnalyticsPage from "../../Analytics/AnalyticsPage"
import "./DataVis.css";

function DataVis(props){

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
                    <AnalyticsPage />
                </div>

            </div>
        </div>
    );

}

export default DataVis;