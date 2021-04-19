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
            Active Events: 
            <div className="userinfo-events">
            {userinfo.PlannedEvents && userinfo.PlannedEvents.ActiveEvents.map((event, index) => {
                    return(
                        <Event event={event} />
                    );
            })}
            </div>
        </div>
        
    const upcomingEvents = userinfo.PlannedEvents && userinfo.PlannedEvents.UpcomingEvents.length <= 0 ? "" :
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
        
    const pastEvents = userinfo.PlannedEvents && userinfo.PlannedEvents.PastEvents.length <= 0 ? "" :
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

    const soldItems = userinfo.SoldProducts && userinfo.SoldProducts.length <= 0 ? "" :
        <div>
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

    return(
        <div>
        <Navbar />

        <div className="mt-5" >
        <div className="userinfo-body">
        <div className="userinfo-avatar">
            <div>
                <Image src={userinfo.AvatarURL} roundedCircle alt="avatar" className="userinfo-avatar-img"/>
            </div>
            <div style={{textAlign:"center", marginTop:"10px"}}>{userinfo.Username} </div>
            <div className="userinfo-avatar-subscribebtn">
                <SubscribeButton user={loggedInUser} target={userinfo.Username} />
            </div>
        </div>
        <div className="userinfo-info">
            <div>Followers: {subCount}</div>
            <div>Following: {subToCount}</div>
            <div>Birthday: {moment(userinfo.Birthday).format('YYYY-MM-DD')}</div>
            <div><hr/></div>
            
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

            <div><hr/></div>
            
            {activeEvents}
            {upcomingEvents}
            {pastEvents}
            {soldItems}
        </div>

    </div>
        </div>
        </div>
        
    );

}

export default UserInfo;