import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import Event from "../EventSection/Event";
import ItemCard from "../ItemCard/ItemCard";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import "./UserInfo.css";
import axios from "axios";



function UserInfo(props){
    
    const [userinfo, setUserInfo] = useState([]);
    const [subsribecondition, setSubsribecondition] = useState(false);
    //get user information from the backend
    console.log(props.match.params.username);

    const loggedInUser = localStorage.getItem('user');

    useEffect(()=>{
        
        axios.get('http://localhost:5000/user/getUser/'+props.match.params.username).then(res=>{
            if(res.status!==200){
                alert("Can't connect to the backend server");
                return;
            }
    
            setUserInfo(res.data);
            console.log("from backend", userinfo);
        })
        
    },[]);

    return(
        <div>
        <Navbar />

        <div className="mt-5" >
        <div className="userinfo-body">
        <div className="userinfo-avatar">
            <div>
                <Image src={userinfo.AvatarURL} roundedCircle alt="avatar" className="userinfo-avatar-img"/>
            </div>
            <div className="userinfo-avatar-subscribebtn">
                <SubscribeButton user={loggedInUser} target={userinfo.Username} />
            </div>
        </div>
        <div className="userinfo-info">
            <div>Username: {userinfo.Username} </div>
            <div>Followers: </div>
            <div>Followings: </div>
            <div>Birthday: {userinfo.Birthday}  </div>
            <div><hr/></div>
            
            <div>
                <div>Tags: </div>
                <ul className="userinfo-tags-ul ">
                    {
                        userinfo.Tags && userinfo.Tags.map((tag, index) => {
                            return(
                            <li>{tag.Name}</li>
                            );
                        })
                    }
                </ul>
            </div>
            <div><hr/></div>
            <div>
                Ongoing Events: 
                <div className="userinfo-events">
                {userinfo.PlannedEvents && userinfo.PlannedEvents.ActiveEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                })}
                </div>
            </div>
            <div>
                Upcoming Events: 
                <div className="userinfo-events">
                {userinfo.PlannedEvents && userinfo.PlannedEvents.UpcomingEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                })}
                </div>
            </div>
            <div>
                Past Events: 
                <div className="userinfo-events">
                {userinfo.PlannedEvents && userinfo.PlannedEvents.PastEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                })}
                </div>
                
            </div>
            <div><hr/></div>
            <div>
                Sold Items: 
                <div className="userinfo-events">
                {userinfo.SoldProducts && userinfo.SoldProducts.map((item, index) => {
                        return(
                            <ItemCard item={item} itemType="sold" />
                        );
                })}
                </div>
            </div>
            
        </div>

    </div>
        </div>
        </div>
        
    );

}

export default UserInfo;