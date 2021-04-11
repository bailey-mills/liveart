import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import axios from "axios";

function SubscribeButton(props){
    const [status, setStatus] = useState(false);

    let body = {
        User: props.user,
        Target: props.target
    }
    
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

    let button = <Button className="btn-success userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Subscribe</Button>
    if(status === true)
    {
        button = <Button className="btn-danger userinfo-avatar-subscribebtn" onClick={handleSubscribe}>Unsubscribe</Button>;
    }

    return(
        button
    );

}

export default SubscribeButton;