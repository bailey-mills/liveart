import React, { useState } from "react";
import "./Sidebar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



function Sidebar(props){

    console.log(props);

    return(
        <div className="sidebar-box">
            <ul>
                <li className="sidebar-empty"> </li>
                <li className="sidebar-header">Welcome! {props.username}</li>
                <li className="sidebar-info">Follower: 111 Following: 50</li>
                <li className="sidebar-empty"> </li>
                <li className="sidebar-title"> User </li>
                <Link className="sidebar-link" to={"/userprofile/bio"}><li className="sidebar-item">Bio</li></Link>
                <li className="sidebar-title"> Event </li>
                <Link className="sidebar-link" to={"/userprofile/subsevents"}><li className="sidebar-item">Subscribed Events</li></Link>
                <Link className="sidebar-link" to={"/userprofile/plannedevents"}><li className="sidebar-item">My Planned Events</li></Link>
                <li className="sidebar-title"> Work </li>
                <Link className="sidebar-link" to={"/userprofile/soldproducts"}><li className="sidebar-item">Works I have sold</li></Link>
                <Link className="sidebar-link" to={"/userprofile/purchasedproducts"}><li className="sidebar-item">Works I have purchased</li></Link>

                <li className="sidebar-title"> Analysis </li>
                <Link className="sidebar-link" to={"/userprofile/datavis"}><li className="sidebar-item">Data Vis</li></Link>
                <li className="sidebar-empty"> </li>
            </ul>
        </div>
    );
}

export default Sidebar;