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
import moment from 'moment';


function UserInfo(props){
    
    const [userinfo, setUserInfo] = useState({AvatarURL: "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"});
    const [subCount, setSubCount] = useState(0);
    const [subToCount, setSubToCount] = useState(0);

    //get user information from the backend
    console.log(props.match.params.username);

    const loggedInUser = localStorage.getItem('user');

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/user/getUser/'+props.match.params.username).then(res=>{
            if(res.status == 200){
                setUserInfo(res.data);
            }
        })

        axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribersCount/'+props.match.params.username).then(res=>{
            if(res.status == 200){
                setSubCount(res.data);
            }
        })

        axios.get(process.env.REACT_APP_SERVER + '/user/getSubscribedToCount/'+props.match.params.username).then(res=>{
            if(res.status == 200){
                setSubToCount(res.data);
            }
        })
        
    },[]);

    const activeEvents = userinfo.PlannedEvents && userinfo.PlannedEvents.ActiveEvents.length <= 0 ? "" :
        <div>
            <h5 className="user-info-title-header">Active Events</h5>
            <div className="soldproducts-cards">
            {userinfo.PlannedEvents && userinfo.PlannedEvents.ActiveEvents.map((event, index) => {
                    return(
                        <Event event={event} />
                    );
            })}
            </div>
        </div>
        
    const upcomingEvents = userinfo.PlannedEvents && userinfo.PlannedEvents.UpcomingEvents.length <= 0 ? "" :
        <div>
            <h5 className="user-info-title-header">Upcoming Events</h5>
            <div className="soldproducts-cards">
            {userinfo.PlannedEvents && userinfo.PlannedEvents.UpcomingEvents.map((event, index) => {
                    return(
                        <Event event={event} />
                    );
            })}
            </div>
        </div>
        
    const pastEvents = userinfo.PlannedEvents && userinfo.PlannedEvents.PastEvents.length <= 0 ? "" :
        <div>
            <h5 className="user-info-title-header">Past Events</h5>
            <div className="soldproducts-cards">
            {userinfo.PlannedEvents && userinfo.PlannedEvents.PastEvents.map((event, index) => {
                    return(
                        <Event event={event} />
                    );
            })}
            </div>
        </div>

    const soldItems = userinfo.SoldProducts && userinfo.SoldProducts.length <= 0 ? "" :
        <div>
            <div>
                <h5 className="user-info-title-header">Sold Items</h5>
                <div className="soldproducts-cards">
                {userinfo.SoldProducts && userinfo.SoldProducts.map((item, index) => {
                        return(
                            <ItemCard item={item} itemType="sold" />
                        );
                })}
                </div>
            </div>
        </div>

    return(
        <div>
        <Navbar />
        
        <div className="home-page-content">
        <div className="mt-5" >
        <div className="userinfo-body">
        <div className="userinfo-avatar">
            <div>
                <Image src={userinfo.AvatarURL} roundedCircle alt="avatar" className="userinfo-avatar-img"/>
            </div>
            <div className="sub-button-parent">
                <SubscribeButton user={loggedInUser} target={userinfo.Username} />
            </div>
        </div>
        <div className="userinfo-info">
            <div>
                <h4>{userinfo.Username}</h4>
            </div>
            <div>Followers: {subCount}</div>
            <div>Following: {subToCount}</div>
            <div>Birthday: {moment(userinfo.Birthday).format('YYYY-MM-DD')}</div>
            
            <div>
                <div>Interests: </div>
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
        </div>
    </div>
        <div style={{marginTop:"20px"}}/>
            
            {activeEvents}
            {upcomingEvents}
            {pastEvents}
            {soldItems}
        </div>
        </div>
        </div>
    );

}

export default UserInfo;