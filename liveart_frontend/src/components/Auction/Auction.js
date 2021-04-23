import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Auction.css";
import workimg from "../../Assets/workimgSample.json";
import Button from "react-bootstrap/Button";
import Chat from "./Chat/Chat/Chat";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import moment from 'moment';

export default function Auction(props){
    let signedin = true;
    let chatroom;
    let controllbox;

    let currentUsername = localStorage.getItem('user');
    let currentUserID = localStorage.getItem('userID');
    if(currentUsername===null || currentUserID ===null )
    {
        signedin = false;
    }

    const currentEventID = props.match.params.eventid;
    const [allItems, setAllItems] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);
    const [currentOnBiddingItem, setCurrentOnBiddingItem] = useState(-1);
    const [currentItemCode, setCurrentItemCode] = useState();
    const [currentHighestBidding, setCurrentHighestBidding] = useState(0);
    const [currentItemBasePrice, setCurrentItemBasePrice] = useState(0);
    const [role, setRole] = useState("");
    const [bidinput, setBidinput] = useState();
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [mylastbid, setMylastbid] = useState("");

        useEffect(() => {
            console.log("getProducts");
            axios.get('http://localhost:5000/auction/getProducts/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                //console.log(res.data);
                setAllItems(res.data);
              }
                
            });

            axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
                //setAllItems(res.data);
              }
                
            });

            axios.get('http://localhost:5000/auction/getHost/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setEventInfo(res.data[0]);
                //console.log("eventinfo",eventInfo);
                if(res.data[0].Username === currentUsername)
                {
                    setRole("host");
                }
                else{
                    setRole("audience");
                }
              }

              axios.get('http://localhost:5000/auction/getEventTags/'+currentEventID)
              .then(res=>{
                if(res.status === 200)
                {
                  //console.log("tags==============",res.data);
                  setAllTags(res.data);
                  //setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
                  //setAllItems(res.data);
                }
                  
              });
            
                
            });



        }, [] );

        if (currentItemCode === undefined) {
            for(let i=0;i<allItems.length;i++){
                if(allItems[i].ID == currentOnBiddingItem)
                {
                    setCurrentItemBasePrice(allItems[i].BasePrice);
                    setCurrentItemCode(
                        <div className="auction-currentitem">
                            <div className="auction-currentitem-description">
                            <ul>
                                <li>Item Name: <b>{allItems[i].Name}</b></li>
                                <li>Description: <b>{allItems[i].Summary}</b></li>
                                <li>Base Price: <b>${allItems[i].BasePrice}</b></li>
                            </ul>
    
                            </div>
                            <div className="auction-currentitem-img">
                            <img src={allItems[i].PreviewURL} alt={allItems[i].ID} className="auction-currentitem-img-pic"/>
                            </div>
                        </div>
                    );
                }

                if (currentOnBiddingItem === null) {
                    setCurrentItemCode(<div className="empty-auction">The auction has concluded</div>);
                }
            }
        }

        useEffect(() => {
            if(currentOnBiddingItem!==-1 && currentOnBiddingItem!==null)
            {
                const interval = setInterval(() => {

                    axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
                    .then(res=>{
                    if(res.status === 200)
                    {
                        setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
                        //setAllItems(res.data);
                    }
                        
                    });

                    axios.get('http://localhost:5000/auction/getHighestBid/'+currentOnBiddingItem)
                      .then(res=>{
                      if(res.status === 200)
                      {
                          if(res.data.length > 0)
                          {
                            setCurrentHighestBidding(res.data[0]);
                          }
                          
                          
                          //setAllItems(res.data);
                      }
                          
                      })
      
                  }, 1000);
                  return () => clearInterval(interval);
                
            }
        }, [currentOnBiddingItem]);
            

    function handleSold(event){
        axios.post('http://localhost:5000/auction/createTransaction/'+currentHighestBidding.ID)
        .then(res=>{
          if(res.status !== 201)
          {
            alert("Auction Wrong");
          }
            
        });

        //setCurrentOnBiddingItem(currentOnBiddingItem+1);
    }

    function handleSkip(){
        axios.patch('http://localhost:5000/auction/skipProduct/'+currentEventID)
        .then(res=>{
          if(res.status !== 204)
          {
            alert("Auction Wrong");
          }
            
        });
    }

    function handleBidding(){
        setError("");
        if(bidinput!== null && bidinput > currentItemBasePrice)
        {
            const bidinfo = {"EventID": currentEventID, "UserID":currentUserID, "Amount" : bidinput};
            axios.post('http://localhost:5000/auction/createBid/'+currentOnBiddingItem, bidinfo)
            .then(res=>{
              if(res.status === 201)
              {
                setMylastbid(bidinput);
                setFeedback("You successfully bidded. $"+bidinput);
                setBidinput("");
              }
                
            })
            .catch(function (error) {          
                if(error.response.status===400)
                {                
                    setBidinput("");
                    setError(error.response.data.message);
                }
            });
        }
        else
        {
            setError("The bid price can not be smaller than the base price!")
        }

    }

    function clearNotice(){
        setError("");
        setFeedback("");
    }

    
    if(role==="host")    //current user is the host
    {
        controllbox = <div className="auction-controller-host">
            <div>
            <button className="btn btn-outline-warning btn-sm auction-btn" onClick={handleSold}>Finish Bidding for this item</button>
            <button className="btn btn-outline-danger btn-sm auction-btn" onClick={handleSkip}>Skip this item</button>
            </div>
            <div className="mt-3">
                
            Current Highest Bidding: <input className="mr-1 ml-1" value={currentHighestBidding.Amount != undefined ? "$ "+currentHighestBidding.Amount : "No Bid"} disabled /> <strong>{currentHighestBidding.Amount != undefined ? "by "+currentHighestBidding.Username+" at "+moment(currentHighestBidding.Timestamp).format('h:mm A') : ""} </strong>
            </div>
        
        </div>

    }
    else
    {
        controllbox = <div className="auction-controller-audience">
            <div className="">
            Current Highest Bidding: <input className="mr-1 ml-1" value={currentHighestBidding.Amount != undefined ? "$ "+currentHighestBidding.Amount : "No Bid"} disabled /> <strong>{currentHighestBidding.Amount != undefined ? "by "+currentHighestBidding.Username+" at "+moment(currentHighestBidding.Timestamp).format('h:mm A') : ""} </strong>

            </div>
            <div className="mt-2">
            Enter your bidding: 
            <input value={bidinput} onChange={(e) => setBidinput(e.target.value)} onClick={clearNotice} className="mr-2 ml-1"></input>
            <button className=" btn btn-outline-success btn-sm " onClick={handleBidding}>submit</button>
            </div>
            <div className="mt-2">
                Your Last Bid: <input className="mr-1 ml-1" value={"$ "+mylastbid} disabled />
                <div className="text-danger">{error}</div>
                <div className="text-success">{feedback}</div>
            </div>
        </div>
        


    }
    
    if(signedin === true)
    {
        chatroom = <div>
            <Chat roomid={currentEventID} />
        </div>
    }
    else
    {
        chatroom=<div className="auction-chat-unsignedin">
        <h5>You haven't logged in yet!</h5>
        <Link to={{
             pathname: '/login',
             state: { registered: false }
             }}><Button className="btn btn-success btn-sm">Login</Button></Link> now to get into the chat room!
        </div>

        controllbox = <div className="auction-controlbox-unsignedin">
            <h5>You haven't logged in yet!</h5>
            <Link to={{
             pathname: '/login',
             state: { registered: false }
             }}><Button className="btn btn-success btn-sm">Login</Button></Link> now to participate the auction!

        </div>
    }

    return(
        
        <div>
            <Navbar />
            <div className="auction-body">
                <div className="auction-title shadow p-2 mb-3 bg-body rounded">
                    <div className="title-area atitle rounded">
                        <h2>{eventInfo!==null ? eventInfo.EventTitle : "..."}</h2>
                        {eventInfo ? <div className="event-tags-category-light auction-tags">{eventInfo.CategoryName}</div> : ''}
                        {eventInfo!==null ? 
                            allTags.map((tag, index)=>{
                                return(
                                    <div className="auction-tags">{tag.Name}</div>
                                );
                            })

                         : "event tags"}
                    </div>
                    <div className="title-area ahost rounded">
                        <b>{eventInfo!==null ? eventInfo.Username : "host name"}</b>
                        <SubscribeButton user={currentUsername} target={eventInfo.Username} />
                    </div>
                    {/* <div className="title-area aaudience rounded">
                        audience number: 100
                    </div> */}
                    
                </div>
                <div className="auction-main shadow p-2 mb-3 bg-body rounded">
                    <div className="auction-area preview-area rounded">
                        <div className="preview-title">
                            <h3>Preview</h3>
                            <hr/>
                        </div>
                        <div className="preview-img-set rounded">
                            <ul>
                                {                                   
                                    allItems && allItems.map((item,index) =>{
                                        return(
                                            <div className={"preview-img "}>
                                            <li><p>{item.Name}</p><img className="auction-preview-img" id={item.ID} src={item.PreviewURL} alt={item.ID} /> </li>
                                            </div> 
                                        );
                                    })
                                }
                                
                            </ul>
                        </div>
                    </div>

                    
                    <div className="auction-area livestream-area rounded">
                        <div className="livestream-videobox">
                        {currentItemCode}
                        {/* {currentOnBiddingItem} */}
                        </div>
                        <div className="livestream-controlltable">
                        
                        {controllbox}
                        </div>
                    </div>


                    <div className="auction-area chat-area rounded">
                            {chatroom}
                    </div>
                </div>
                
            </div>
        </div>
    );

}