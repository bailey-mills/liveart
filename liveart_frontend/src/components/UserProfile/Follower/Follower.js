import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import UserCardCompact from"../../UserSearch/UserCardCompact";
import "./Follower.css";



function Follower(props){
    let currentUsername = localStorage.getItem('user');

    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribers/' + currentUsername).then(res=>{
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
                    <h1>Users who are following you</h1>
                    <div className="follower-grid">
                    <ul className="follower-list">
                    {
                        users
                    }
                    </ul>
                    </div>
                </div>
                {/* This is UserProfile page for {props.match.params.username} */}
                {/* This is UserProfile page for {currentUsername} */}
                

            </div>
        </div>
    );

}

export default Follower;