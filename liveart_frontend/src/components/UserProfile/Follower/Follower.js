import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "./Follower.css";



function Follower(props){

    const sample = [
        {
            "Username": "Josue_Boulden_751",
            "ProvinceID": 1,
            "Province": "Ontario"
        },
        {
            "Username": "Portia_Palmeter_357",
            "ProvinceID": 1,
            "Province": "Ontario"
        },
        {
            "Username": "Tori_Denina_817",
            "ProvinceID": 3,
            "Province": "Nova Scotia"
        }
    ];

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;
    if(currentUsername===null)
    {
        //jump to login page
    }

    const [users, setUsers] = useState([]);
    useEffect(()=>{
        
        axios.get('http://localhost:5000/user/getSubscribers/'+currentUsername).then(res=>{
            if(res.status!==200){
                alert("Can't connect to the backend server");
                return;
            }
    
            setUsers(res.data);
            //console.log("from backend", userinfo);
        })
        
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

                            users && users.map((user,index) =>{
                            return(
                                <li className="shadow p-3 mb-3  bg-body rounded"><Link to={"/user/"+user.Username} target="_blank" rel="noopener noreferrer">{user.Username}</Link></li>
                            );
                        })
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