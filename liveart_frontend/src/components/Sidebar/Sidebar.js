import React, { useState } from "react";
import "./Sidebar.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

function Sidebar(props) {
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    // Get default subscription state
    let username = localStorage.getItem('user');;
    axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribersCount/' + username).then(res=>{
        if(res.status === 200)
        {
            setFollowers(res.data);
        }
    });
    axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribedToCount/' + username).then(res=>{
        if(res.status === 200)
        {
            setFollowing(res.data);
        }
    });

    return(
        <div className="sidebar-box">
            <ul>
                <li className="sidebar-empty"> </li>
                <li className="sidebar-header">Welcome! {props.username}</li>
                <li className="sidebar-info"><Link to={"/userprofile/follower"}> Follower: {followers} </Link> | <Link to={"/userprofile/following"}>Following: {following}</Link></li>
                <li className="sidebar-empty"> </li>
                <li className="sidebar-title"> User </li>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/bio"}><li className="sidebar-item">Bio</li></Link>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/passwordreset"}><li className="sidebar-item">Change Your Password</li></Link>
                <li className="sidebar-title"> Event </li>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/subsevents"}><li className="sidebar-item">Subscribed Events</li></Link>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/plannedevents"}><li className="sidebar-item">My Planned Events</li></Link>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/newevent"}><li className="sidebar-item">Create an Event</li></Link>
                <li className="sidebar-title"> Work </li>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/soldproducts"}><li className="sidebar-item">Works I have sold</li></Link>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/purchasedproducts"}><li className="sidebar-item">Works I have purchased</li></Link>

                <li className="sidebar-title"> Analysis </li>
                <Link className="sidebar-link" style={{ textDecoration: 'none' }} to={"/userprofile/datavis"}><li className="sidebar-item">Data Visulization</li></Link>
                <li className="sidebar-empty"> </li>
            </ul>
        </div>
    );
}

export default Sidebar;