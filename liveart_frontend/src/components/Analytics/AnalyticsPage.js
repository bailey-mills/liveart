import React from "react";
import axios from "axios";
import Age from "./Charts/Age";
require('dotenv').config();

function AnalyticsPage(){
    return(
        <Age />
    );
}

export function getData(api) {
    axios.get(process.env.REACT_APP_SERVER + '/analytics' + api).then(res=>{
        if(res.status !== 200)
        {
            return;
        }
        
        return res.data;
    })
}

export default AnalyticsPage;