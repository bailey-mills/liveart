/**
 * @file Following.js - The source code of the following details sub-page component 
 * @author Eric Lin & Bailey Mills
 * 
 */ 
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import UserCardCompact from"../../UserSearch/UserCardCompact";
import "./Following.css";

function Following(props){
    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;

    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribedTo/' + currentUsername).then(res=>{
            if(res.status === 200) {
                // Organize results into user objects
                const items = res.data.map((user) =>
                    <UserCardCompact User={user} />
                );
                setUsers(items);
            }
        });
    },[]);

    return(
        <div>
            <Navbar />
            <div className="main-body">
                <Sidebar username={currentUsername}/>
                <div className="content-body">
                    <div className="home-page-content">
                        <h3 style={{paddingTop:"15px", marginBottom:"15px", textAlign:"center"}}>Users who you are following </h3>
                        <div className="following-grid">
                            <ul className="following-list">
                            {
                                users
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Following;