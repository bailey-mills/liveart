import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Auction.css";
import workimg from "../../Assets/workimgSample.json";

export default function Auction(props){
    let ItemStatusIndicator_buffer= [];
    let ItemStatusText_buffer= [];
    // let CurrentItemIndex = 0;

    for(var i=0;i<Object.keys(workimg).length;i++)
    {
        ItemStatusIndicator_buffer[i] = "preview-img-unsold";
        ItemStatusText_buffer[i] = "";
    }

    const [ItemStatusIndicator, SetItemStatusIndicator] = useState(ItemStatusIndicator_buffer);
    const [ItemStatusText, SetItemStatusText] = useState(ItemStatusIndicator_buffer);

    const [CurrentItemIndex, SetCurrentItemIndex] = useState(-1);

    // // console.log(props);
    // // console.log(workimg);

    
    // for(var i=0;i<Object.keys(workimg).length;i++)
    // {
    //     ItemStatusIndicator_buffer[i] = "preview-img-unsold";
    // }


    // function sold(event){
    //     // console.log("sold", event);
        
    //     ItemStatusIndicator_buffer[CurrentItemIndex] = "preview-img-sold";
    //     console.log(CurrentItemIndex,ItemStatusIndicator_buffer[CurrentItemIndex]);
    //     // SetCurrentItemIndex(CurrentItemIndex+1);
    //     CurrentItemIndex++;
    //     ItemStatusIndicator_buffer[CurrentItemIndex] = "preview-img-onselling";
    //     console.log(CurrentItemIndex,ItemStatusIndicator_buffer[CurrentItemIndex]);

    //     let ItemStatusIndicator_buffer_buffer = ItemStatusIndicator_buffer;
    //     SetItemStatusIndicator(ItemStatusIndicator_buffer_buffer);
    //     console.log("use state->",ItemStatusIndicator);
    // }

    // const [onsell,setOnsell] = useState(false);

    // function onSellonClick(event) {
    //     setOnsell(!onsell);
    // }

    function sold(event){
        let buffer = CurrentItemIndex +1;
        SetCurrentItemIndex(buffer);
    }

    useEffect(() => {
        // SetCurrentItemIndex(CurrentItemIndex+1);
        ItemStatusIndicator_buffer[CurrentItemIndex] = "preview-img-onselling";
        ItemStatusText_buffer[CurrentItemIndex] = "  On Bidding...";
        console.log(CurrentItemIndex,ItemStatusIndicator_buffer[CurrentItemIndex]);
        SetItemStatusIndicator(ItemStatusIndicator_buffer);
        SetItemStatusText(ItemStatusText_buffer);
        console.log("use state->",ItemStatusIndicator);
      }, [CurrentItemIndex]);

    return(
        
        <div>
            <Navbar />
            <div className="auction-body">
                <div className="auction-title">
                    <div className="title-area atitle">
                        auction page {props.match.params.username}
                    </div>
                    <div className="title-area ahost">
                        Host: ericlin
                        <button >subscribe</button>
                    </div>
                    <div className="title-area aaudience">
                        audience number: 100
                    </div>
                    
                </div>
                <div className="auction-main">
                    <div className="auction-area preview-area">
                        <div className="preview-title">
                            <h3>Preview</h3>
                            <hr/>
                        </div>
                        <div className="preview-img-set">
                            <ul>
                                {
                                    
                                    workimg.map((img,index) =>{
                                        console.log();
                                        return(
                                            //<div className={"preview-img "+ItemStatusIndicator[index]}>
                                            /* <div className={"preview-img preview-img-unsold"}>
                                            <div className={onsell ? 'preview-img preview-img-onselling': "preview-img preview-img-unsold"} > */
                                            //<div className={"preview-img preview-img-unsold"}>
                                            <div className={"preview-img "+ItemStatusIndicator[index]}>
                                            <li><p>{img.id}{ItemStatusText[index]}</p><img id={img.id} src={img.url} alt={img.id} /> </li>
                                            </div> 
                                        );
                                    })
                                }
                                
                            </ul>
                        </div>
                    </div>


                    <div className="auction-area livestream-area">
                        <div className="livestream-videobox">
                        live stream
                        </div>
                        <div className="livestream-controlltable">
                        <button onClick={sold}>Finish Bidding for this item</button>
                        </div>
                    </div>


                    <div className="auction-area chat-area">
                        chat
                    </div>
                </div>
                
            </div>
        </div>
    );

}