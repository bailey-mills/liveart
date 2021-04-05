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

    // Get the data
    useEffect(() => {
        getData("artist/singles", setSingles);

        getData("artist/age", setAge);
        getData("artist/ageBoth", setAgeBoth);

        getData("artist/tagList", setTagList);
        getData("artist/tags", setTags);
        getData("artist/tagsGlobal", setTagsGlobal);
        getData("artist/tagsBoth", setTagsBoth);
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
                    <h5>Auction Details</h5>
                    <div className="horizontalContainer">
                        <Tile title="Gross Revenue" value={singles.GrossRevenue} prefix="$" accent="accent blue" />
                        <Tile title="Average Product Value" value={singles.AverageProductValue} prefix="$" accent="accent blue" />
                    </div>

                    <hr />

                    <h5>Age Demographics</h5>
                    <div className="horizontalContainer">
                        <BarChart className="chartContainer" data={age} label="Age" class="chart bar" />
                        <DoubleBarChart className="chartContainer" data={ageBoth} label1="Bailey (left)" label2="Global (right)" class="chart bar right" colours1="#3280e6" colours2="#9ec8ff" />
                    </div>

                    <hr />

                    <h5>Tag Distribution</h5>
                    <div className="horizontalContainer">
                        <DoubleBarChart className="chartContainer" data={tagsBoth} label1="Bailey (left)" label2="Global (right)" class="chart bar wide" tilt="true"
                            colours1={getColours(getIDsFromNames(tagList, tagsBoth.labels), true)}
                            colours2={getColours(getIDsFromNames(tagList, tagsBoth.labels), false)}
                        />
                    </div>
                    <div className="horizontalContainer">
                        <DoughnutChart className="chartContainer" data={tags} class="chart doughnut" colours={getColours(getIDsFromNames(tagList, tags.labels), true)} />
                        <DoughnutChart className="chartContainer" data={tagsGlobal} class="chart doughnut right" colours={getColours(getIDsFromNames(tagList, tagsGlobal.labels), true)} />
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
            return item.Name == labelList[i];
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