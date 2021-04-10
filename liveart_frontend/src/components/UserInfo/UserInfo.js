import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image';
import Event from "../EventSection/Event";
import ItemCard from "../ItemCard/ItemCard";
import "./UserInfo.css";



function UserInfo(props){

    const sample = {
        "Username": "Lenora_Trafford_523",
        "AvatarURL": "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg",
        "Email": "Lenora_Trafford_52@hotmail.com",
        "Birthday": "1976-02-28T00:00:00.000Z",
        "Tags": [
            {
                "ID": 2,
                "Name": "Photorealism"
            },
            {
                "ID": 7,
                "Name": "Oil Painting"
            }
        ],
        "PlannedEvents": {
            "PastEvents": [
                {
                    "EventID": 2,
                    "EventName": "Sculptures for auction",
                    "StartTime": "2021-03-12T11:00:00.000Z",
                    "EndTime": "2021-03-12T12:13:00.000Z",
                    "CategoryID": 2,
                    "CategoryName": "Sculpture",
                    "EventHostUsername": "Lenora_Trafford_523",
                    "EventTags": [
                        {
                            "ID": 10,
                            "Name": "Wooden Statue"
                        },
                        {
                            "ID": 10,
                            "Name": "Wooden Statue"
                        },
                        {
                            "ID": 9,
                            "Name": "Humanoid Figure"
                        }
                    ]
                }
            ],
            "ActiveEvents": [],
            "UpcomingEvents": []
        },
        "SoldProducts": [
            {
                "Name": "Naturel",
                "ProductDescription": "Description of the artwork here",
                "ProductURL": "https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png",
                "BasePrice": 110,
                "FinalPrice": 110,
                "EventID": 2,
                "EventName": "Sculptures for auction",
                "Tags": [
                    {
                        "ID": 10,
                        "Name": "Wooden Statue"
                    }
                ]
            },
            {
                "Name": "Yam",
                "ProductDescription": "Description of the artwork here",
                "ProductURL": "https://cdn.singulart.com/artworks/v2/cutout/4485/main/carousel/1075201_609ade9932cf370aaf3dbfe9eb44ffa4.png",
                "BasePrice": 1059,
                "FinalPrice": 1059,
                "EventID": 2,
                "EventName": "Sculptures for auction",
                "Tags": [
                    {
                        "ID": 10,
                        "Name": "Wooden Statue"
                    }
                ]
            },
            {
                "Name": "Renwick Beige",
                "ProductDescription": "Description of the artwork here",
                "ProductURL": "https://cdn.singulart.com/artworks/pictures/cutout/4485/13603/carousel/serie_13603_c66d8d164efbafcaa6386a2e43975ebf.png",
                "BasePrice": 1455,
                "FinalPrice": 1455,
                "EventID": 2,
                "EventName": "Sculptures for auction",
                "Tags": [
                    {
                        "ID": 10,
                        "Name": "Wooden Statue"
                    }
                ]
            }
        ]
    };

    const [userinfo, setUserInfo] = useState([]);
    const [subsribecondition, setSubsribecondition] = useState(false);
    //get user information from the backend
    console.log(props.match.params.username);

    let subscribebtn;
    if(subsribecondition===false)
    {
        subscribebtn = <Button className="btn-success userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Subscribe</Button>
        
    }
    else
    {
        subscribebtn = <Button className="btn-danger userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Unsubscribe</Button>
    }

    function handleSubscribe(){
        if(subsribecondition===false)
        {
            //send backend a subscribe statement
            setSubsribecondition(true);
        }
        else
        {
            //send backend a unsubscribe statement
            setSubsribecondition(false);
        }
    }

    return(
        <div>
        <Navbar />

        <div className="mt-5" >
        <div className="userinfo-body">
        <div className="userinfo-avatar">
            <div>
                <Image src={sample.AvatarURL} roundedCircle alt="avatar" className="userinfo-avatar-img"/>
            </div>
            <div className="userinfo-avatar-subscribebtn">          
                {subscribebtn}
            </div>
        </div>
        <div className="userinfo-info">
            <div>Username: {sample.Username} </div>
            <div>Followers: </div>
            <div>Followings: </div>
            <div>Birthday: {sample.Birthday}  </div>
            <div><hr/></div>
            
            <div>
                <div>Tags: </div>
                <ul className="userinfo-tags-ul ">
                    {sample.Tags.map((tag, index) => {
                        return(
                        <li>{tag.Name}</li>
                        );
                    })}
                </ul>
            </div>
            <div><hr/></div>
            <div>
                Ongoing Events: 
                <div className="userinfo-events">
                {sample.PlannedEvents.ActiveEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                })}
                </div>
            </div>
            <div>
                Upcoming Events: 
                <div className="userinfo-events">
                {sample.PlannedEvents.UpcomingEvents.map((event, index) => {
                        return(
                            <Event event={event} />
                        );
                })}
                </div>
            </div>
            <div>
                Past Events: 
                <div className="userinfo-events">
                {sample.PlannedEvents.PastEvents.map((event, index) => {
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
                {sample.SoldProducts.map((item, index) => {
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