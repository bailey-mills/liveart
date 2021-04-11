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
    if(currentUsername===null)
    {
        //jump to login page
    }

    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/user/getSubscribedTo/' + currentUsername).then(res=>{
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
                    <h1>Users who you are following </h1>
                    <div className="following-grid">
                    <ul className="following-list">
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

export default Following;