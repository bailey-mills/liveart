import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Auction.css";
import workimg from "../../Assets/workimgSample.json";
import Button from "react-bootstrap/Button";

export default function Auction(props){

    let currentUsername = localStorage.getItem('user');
    let currentUserID = localStorage.getItem('userID');
    if(currentUsername===null || currentUserID ===null )
    {
        //jump to login page
    }

    const currentEventID = props.match.params.eventid;
    const [allItems, setAllItems] = useState([]);
    const [eventInfo, setEventInfo] = useState([]);
    const [currentOnBiddingItem, setCurrentOnBiddingItem] = useState(-1);
    const [currentItemCode, setCurrentItemCode] = useState(<div>Nothing</div>);
    const [currentHighestBidding, setCurrentHighestBidding] = useState(0);
    const [currentItemBasePrice, setCurrentItemBasePrice] = useState(0);
    const [role, setRole] = useState("");
    const [bidinput, setBidinput] = useState();
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [mylastbid, setMylastbid] = useState("");
    const [subsribecondition, setSubsribecondition] = useState(false);

        useEffect(() => {
            console.log("getProducts");
            axios.get('http://localhost:5000/auction/getProducts/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                console.log(res.data);
                setAllItems(res.data);
              }
                
            });

            axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                console.log(res.data);
                setCurrentOnBiddingItem(res.data[0].CurrentBiddingProductID)
                //setAllItems(res.data);
              }
                
            });

            axios.get('http://localhost:5000/auction/getHost/'+currentEventID)
            .then(res=>{
              if(res.status === 200)
              {
                setEventInfo(res.data[0]);
                console.log("eventinfo",eventInfo);
                if(res.data[0].Username === currentUsername)
                {
                    setRole("host");
                }
                else{
                    setRole("audience");
                }
              }
                
            });



        }, [] );


        useEffect(() => {

            for(let i=0;i<allItems.length;i++){
                if(allItems[i].ID == currentOnBiddingItem)
                {
                    console.log("here",allItems[i].ID);
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
                            <img src={allItems[i].PreviewURL} alt={allItems[i].ID} />
                            </div>
                        </div>
                    );
                }
            }
                       
            
        }, [currentOnBiddingItem]);

        useEffect(() => {
            console.log("current on bidding item", currentOnBiddingItem);
            if(currentOnBiddingItem!==-1 && currentOnBiddingItem!==null)
            {
                const interval = setInterval(() => {

                    axios.get('http://localhost:5000/auction/getCurrentBiddingProduct/'+currentEventID)
                    .then(res=>{
                    if(res.status === 200)
                    {
                        console.log(res.data);
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
                            console.log("current highest bid",res.data);
                            setCurrentHighestBidding(res.data[0]);
                            console.log(res.data[0].Amount);
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
        // console.log("skipped");
        axios.patch('http://localhost:5000/auction/skipProduct/'+currentEventID)
        .then(res=>{
          if(res.status !== 204)
          {
            alert("Auction Wrong");
          }
            
        });
    }

    function handleBidding(){
        if(bidinput!== null && bidinput > currentItemBasePrice)
        {
            const bidinfo = {"EventID": currentEventID, "UserID":currentUserID, "Amount" : bidinput};
            console.log("new bid:",bidinfo);
            axios.post('http://localhost:5000/auction/createBid/'+currentOnBiddingItem, bidinfo)
            .then(res=>{
              if(res.status === 201)
              {
                setMylastbid(bidinput);
                setFeedback("You successfully bidded."+bidinput);
                setBidinput("");
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

    let controllbox;
    if(role==="host")    //current user is the host
    {
        controllbox = <div className="auction-controller-host">
            <div>
            <button className="btn btn-outline-warning btn-sm auction-btn" onClick={handleSold}>Finish Bidding for this item</button>
            <button className="btn btn-outline-danger btn-sm auction-btn" onClick={handleSkip}>Skip this item</button>
            </div>
            <div>
                <p>Current Highest Bidding: </p>
                <input value={currentHighestBidding.Amount} disabled />
            </div>
        
        </div>

    }
    else
    {
        controllbox = <div className="auction-controller-audience">
            <div>
                Current Highest Bidding: 
                <input value={currentHighestBidding.Amount} disabled />
            </div>
            <br />
            <div>
            Enter your bidding: 
            <input value={bidinput} onChange={(e) => setBidinput(e.target.value)} onClick={clearNotice} ></input>
            <button className="ml-3 btn btn-outline-success btn-sm " onClick={handleBidding}>submit</button>
            </div>
            <div>
                <p>Your Last Bid: {mylastbid}</p>
                <div className="text-danger">{error}</div>
                <div className="text-success">{feedback}</div>
            </div>
        </div>
        


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
            <div className="auction-body">
                <div className="auction-title shadow p-2 mb-3 bg-body rounded">
                    <div className="title-area atitle rounded">
                        <h2>{eventInfo!==null ? eventInfo.EventTitle : "event title"}</h2>
                        {eventInfo!==null ? eventInfo.EventSummary : "event description"}
                    </div>
                    <div className="title-area ahost rounded">
                        Host: <b>{eventInfo!==null ? eventInfo.Username : "host name"}</b>

                        {role==="audience" ? subsribecondition===false ?  <Button className="btn-success btn-sm mt-2" onClick={handleSubscribe}>Subscribe</Button> : <Button className="btn-danger btn-sm mt-2" onClick={handleSubscribe}>Unsubscribe</Button> : ""}
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
                                        console.log();
                                        return(
                                            <div className={"preview-img "}>
                                            <li><p>{item.Name}</p><img id={item.ID} src={item.PreviewURL} alt={item.ID} /> </li>
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
                        
                    </div>
                </div>
                
            </div>
        </div>
    );

}