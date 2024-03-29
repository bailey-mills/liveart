/**
 * @file SubscribeButton.js - The source code of the subscribe button component
 * @author Bailey Mills
 * 
 */ 
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import axios from "axios";

function SubscribeButton(props){
    const [status, setStatus] = useState(false);

    let body = {
        User: props.user,
        Target: props.target
    }
    
    /**
     * @method handleSubscribe 
     * @description Subscribe button clicked hanlder - Subscribe the target user
     * @param {null} - none
     * @returns {null} - none
     */
    async function handleSubscribe(){
        // Toggle subscription
        await axios.post(process.env.REACT_APP_SERVER + '/user/toggleSubscription', body).then(res=>{
            if(res.status === 200)
            {
                setStatus(res.data.Subscribed);
            }
        });
    }

    if (props.user && props.target) {
        // Get default subscription state
        axios.post(process.env.REACT_APP_SERVER + '/user/checkSubscription', { User: props.user, Target: props.target}).then(res=>{
            if(res.status === 200)
            {
                setStatus(res.data.Subscribed);
            }
        });
    }

    let button = null;
    if (props.user !== props.target && props.user) {
        button = <Button className="btn-secondary userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Unsubscribe</Button>;
        if(status === true)
        {
            button = <Button className="btn-danger userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Unsubscribe</Button>;
        }
        else {
            button = <Button className="btn-success userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Subscribe</Button>
        }
    }

    return(
        button
    );

}

export default SubscribeButton;