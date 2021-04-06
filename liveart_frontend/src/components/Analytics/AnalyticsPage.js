import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './AnalyticsPage.css';

import Tile from "./Charts/Tile";
import BarChart from "./Charts/Bar";
import DoughnutChart from "./Charts/Doughnut";
import DoubleBarChart from "./Charts/DoubleBar";

import { Chart } from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { chartColoursLight } from './SharedResources/coloursLight';
import { chartColoursDark } from './SharedResources/coloursDark';

require('dotenv').config();

// Determine if all of the data sets have been gathered
let loaded = 0;
const loadRequired = 7;

function AnalyticsPage(){
    Chart.plugins.register(ChartDataLabels);
    
    // Data sets
    const [singles, setSingles] = useState();

    const [age, setAge] = useState();
    const [ageBoth, setAgeBoth] = useState();

    const [tagList, setTagList] = useState();
    const [tags, setTags] = useState();
    const [tagsGlobal, setTagsGlobal] = useState();
    const [tagsBoth, setTagsBoth] = useState();

    // Get the userID
    let userID = 1;

    // Get the data
    useEffect(() => {
        getData("artist/singles/" + userID, setSingles);

        getData("artist/age/" + userID, setAge);
        getData("artist/ageBoth/" + userID, setAgeBoth);

        getData("artist/tagList", setTagList);
        getData("artist/tags/" + userID, setTags);
        getData("artist/tagsGlobal", setTagsGlobal);
        getData("artist/tagsBoth/" + userID, setTagsBoth);
    }, []);

    // Display a loading screen if data isn't ready
    if (loaded < loadRequired) {
        return <div>Loading ({loaded}/{loadRequired})...</div>;
    }
    
    // Display the charts
    return(
        <Tabs className="analytics">
            <TabList>
                <Tab>Artist Activity</Tab>
                <Tab>Buyer Activity</Tab>
            </TabList>

            <TabPanel>
                <div>
                    <h4>Auction Details</h4>
                    <div className="horizontalContainer">
                        <Tile title="Gross Revenue" value={singles.GrossRevenue} prefix="$" accent="accent blue" />
                        <Tile title="Average Product Value" value={singles.AverageProductValue} prefix="$" accent="accent blue" />
                    </div>

                    <hr />

                    <h4>Age Demographics</h4>
                    <div className="horizontalContainer">
                        <BarChart className="chartContainer" data={age} label="Age" class="chart bar" title="Audience Age" />
                        <DoubleBarChart className="chartContainer" data={ageBoth} label1="Bailey (left)" label2="Global (right)" class="chart bar right" colours1="#3280e6" colours2="#9ec8ff" title="Audience Age Comparison (%)" />
                    </div>

                    <hr />

                    <h4>Tag Distribution</h4>
                    <div className="horizontalContainer">
                        <DoubleBarChart className="chartContainer" data={tagsBoth} label1="Bailey (left)" label2="Global (right)" class="chart bar wide" tilt="true"
                            colours1={getColours(getIDsFromNames(tagList, tagsBoth.labels), true)}
                            colours2={getColours(getIDsFromNames(tagList, tagsBoth.labels), false)}
                            title="Tag Usage Comparison (%)"
                        />
                    </div>
                    <div className="horizontalContainer">
                        <DoughnutChart className="chartContainer" data={tags} class="chart doughnut" colours={getColours(getIDsFromNames(tagList, tags.labels), true)} title="Your Tag Usage" />
                        <DoughnutChart className="chartContainer" data={tagsGlobal} class="chart doughnut right" colours={getColours(getIDsFromNames(tagList, tagsGlobal.labels), true)} title="Global Tag Usage" />
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div>
                    Buyer Activity
                </div>
            </TabPanel>
        </Tabs>
    );
}

function getData(api, setData) {
    axios.get(process.env.REACT_APP_SERVER + '/analytics/' + api).then(res=>{
        if(res.status === 200)
        {
            loaded++;
            setData(res.data);
        }
    });
}

function getIDsFromNames(tagList, labelList) {
    let ret = [];
    let i = 0;
    
    for (i = 0; i < labelList.length; i++) {        
        let curr = tagList.find(item => {
            return item.Name === labelList[i];
        });
        ret.push(curr.ID);
    }

    return ret;
}

function getColours(idList, dark) {
    let ret = [];
    let baseList = dark ? chartColoursDark : chartColoursLight;

    let i = 0;
    for (i = 0; i < idList.length; i++) {
        ret.push(baseList[idList[i]]);
    }

    return ret;
}

export default AnalyticsPage;