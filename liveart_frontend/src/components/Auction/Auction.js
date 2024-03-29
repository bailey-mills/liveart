/**
 * @file Auction.js - The source code of the entire Auction page component
 * @author Eric Lin & Bailey Mills
 * 
 */   
import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Auction.css";
import Button from "react-bootstrap/Button";
import SubscribeButton from "../SubscribeButton/SubscribeButton";
import Chat from "./Chat/Chat/Chat"
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

    //UseState Constants
    const currentEventID = props.match.params.eventid;
    const [allItems, setAllItems] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);
    const [currentOnBiddingItem, setCurrentOnBiddingItem] = useState(-1);
    const [currentItemCode, setCurrentItemCode] = useState(<div className="empty-auction">The auction has concluded.</div>);
    const [currentHighestBidding, setCurrentHighestBidding] = useState(0);
    const [currentItemBasePrice, setCurrentItemBasePrice] = useState(0);
    const [role, setRole] = useState("");
    const [bidinput, setBidinput] = useState();
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [mylastbid, setMylastbid] = useState("");
    const [subsribecondition, setSubsribecondition] = useState(false);

    const chatroomchild = useRef();

        /* Get all products, current on auction item and the seller in this event */
        useEffect(() => {
            axios.get('http://localhost:5000/auction/getProducts/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setAllItems(res.data);
              }
                
            });

            axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
              }
                
            });

            axios.get('http://localhost:5000/auction/getHost/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setEventInfo(res.data[0]);
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
                  setAllTags(res.data);
                }
                  
              });                    
            });
        }, [] );

        //Get all items in this event
        useEffect(() => {
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
            }
                       
            
        }, [currentOnBiddingItem, allItems]);

        /* Get current on auction item, the highest bid of the item from the server once per second*/
        useEffect(() => {
            if(currentOnBiddingItem!==-1 && currentOnBiddingItem!==null)
            {
                const interval = setInterval(() => {

                    axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
                    .then(res=>{
                    if(res.status === 200)
                    {
                        setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
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
                      }
                          
                      })

                      axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
                      .then(res=>{
                        if(res.status === 200)
                        {
                          setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
                        }
                          
                      });
          
      
                  }, 1000);
                  return () => clearInterval(interval);
                
            }
        }, [currentOnBiddingItem, currentEventID]);
            

        /**
         * @method handleSold 
         * @description Seller Finish bidding button event handler - Finish the bidding for the current item, the latest user who offered the bidding is the winner
         * @param {event} - event
         * @returns {null} - none
         */
        function handleSold(event){
            for(let i=0;i<allItems.length;i++){
                if(allItems[i].ID == currentOnBiddingItem)
                {
                    chatroomchild.current.boardCastMessage("Item: "+allItems[i].Name+" has been auctioned to "+currentHighestBidding.Username+" at $"+currentHighestBidding.Amount);
                }
            }
            const transctionInfo = {"BiddingID": currentHighestBidding.ID , "EventID": currentEventID};
            axios.post('http://localhost:5000/auction/createTransaction', transctionInfo)
            .then(res=>{
              if(res.status !== 201)
              {
                alert("Auction Wrong");
              }
                
            });
            
        //setCurrentOnBiddingItem(currentOnBiddingItem+1);
    }

    /**
     * @method handleSkip 
     * @description Seller skip button event handler - Skip the auction for the current item and move to the next item
     * @param {null} - none
     * @returns {null} - none
     */
    function handleSkip(){
        for(let i=0;i<allItems.length;i++){
            if(allItems[i].ID == currentOnBiddingItem)
            {
                chatroomchild.current.boardCastMessage("Item: "+allItems[i].Name+" has been skipped by the host.");

            }
        }
        axios.patch('http://localhost:5000/auction/skipProduct/'+currentEventID)
        .then(res=>{
          if(res.status !== 204)
          {
            alert("Auction Wrong");
          }
            
        });
    }

    /**
     * @method handleBidding 
     * @description Buyer bidding submit button event handler - Create the bid
     * @param {null} - none
     * @returns {null} - none
     */
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
                setFeedback("You successfully bid $"+bidinput);
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

    /**
     * @method clearNotice 
     * @description Clean error message and feedback message in the control box
     * @param {null} - none
     * @returns {null} - none
     */
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
                
            Current Highest Bid: <input className="mr-1 ml-1" value={currentHighestBidding.Amount != null ? "$ "+currentHighestBidding.Amount : "No Bid"} disabled /> <strong>{currentHighestBidding.Amount != undefined ? "by "+currentHighestBidding.Username+" at "+moment(currentHighestBidding.Timestamp).format('h:mm A') : ""} </strong>
            </div>
        
        </div>

    }
    else
    {
        controllbox = <div className="auction-controller-audience">
            <div className="">
            Current Highest Bid: <input className="mr-1 ml-1" value={currentHighestBidding.Amount != null ? "$ "+currentHighestBidding.Amount : "No Bid"} disabled /> <strong>{currentHighestBidding.Amount != undefined ? "by "+currentHighestBidding.Username+" at "+moment(currentHighestBidding.Timestamp).format('h:mm A') : ""} </strong>

            </div>
            <div className="mt-2">
            Enter your bid: 
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
            <Chat roomid={currentEventID} ref={chatroomchild}/>
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
                        <h2>{eventInfo!==null ? eventInfo.EventTitle : "event title"}</h2>
                        <div className="mt-2">
                        {eventInfo ? <div className="event-tags-category-light auction-tags">{eventInfo.CategoryName}</div> : ''}
                        {eventInfo!==null ? 
                            allTags.map((tag, index)=>{
                                return(
                                    <div className="auction-tags">{tag.Name}</div>
                                );
                            })
                            
                         : "event tags"}
                        </div>
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