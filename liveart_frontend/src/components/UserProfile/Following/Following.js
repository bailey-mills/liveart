import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Following.css";



function Following(props){

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

                        sample.map((user,index) =>{
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

export default Following;