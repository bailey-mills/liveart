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
const loadRequired = 9;

function AnalyticsPage(){
    Chart.plugins.register(ChartDataLabels);
    
    // -----------------
    //  ARTIST DATASETS
    // -----------------
    const [artistSingles, setArtistSingles] = useState();
    const [age, setAge] = useState();
    const [ageBoth, setAgeBoth] = useState();
    const [artistTags, setArtistTags] = useState();
    const [artistTagsBoth, setArtistTagsBoth] = useState();

    // ----------------
    //  BUYER DATASETS
    // ----------------
    const [buyerSingles, setBuyerSingles] = useState();    
    const [buyerTags, setBuyerTags] = useState();
    
    // -----------------
    //  MUTUAL DATASETS
    // -----------------
    const [tagList, setTagList] = useState();
    const [tagsGlobal, setTagsGlobal] = useState();

    // Get the userID
    let userID = localStorage.getItem('userID');
    // 611 , 4321

    // Get the data
    useEffect(() => {
        // Artist Data
        getData("artist/singles/" + userID, setArtistSingles);
        getData("artist/age/" + userID, setAge);
        getData("artist/ageBoth/" + userID, setAgeBoth);
        getData("artist/tags/" + userID, setArtistTags);
        getData("artist/tagsBoth/" + userID, setArtistTagsBoth);

        // Buyer Data
        getData("buyer/singles/" + userID, setBuyerSingles);
        getData("buyer/tags/" + userID, setBuyerTags);

        // Mutual Data
        getData("global/tagList", setTagList);
        getData("global/tagsGlobal", setTagsGlobal);
    }, []);

    // Display a loading screen if data isn't ready
    if (loaded < loadRequired) {
        return <div>Loading ({loaded}/{loadRequired})...</div>;
    }
    
    // Not an artist
    //let artistChartsClass = artistTags.data.length === 0 ? "hidden" : "";
    //let artistEmptyClass = artistTags.data.length === 0 ? "" : "hidden";

    // Not a buyer
    //let buyerChartsClass = buyerTags.data.length === 0 ? "hidden" : "";
    //let buyerEmptyClass = buyerTags.data.length === 0 ? "" : "hidden";

    // Display the charts
    loaded = 0;
    return(
        <Tabs className="analytics">
            <TabList>
                <Tab>Artist Activity</Tab>
                <Tab>Buyer Activity</Tab>
            </TabList>

            <TabPanel>
                <div>
                    <div>
                        <h4 className="sectionTitle">Auction Listing Details</h4>
                        <div className="horizontalContainer">
                            <Tile title="Gross Revenue" value={artistSingles.GrossRevenue} prefix="$" accent="accent green" />
                            <Tile title="Average Product Value" value={artistSingles.AverageProductValue} prefix="$" accent="accent green" />
                        </div>

                        <hr />

                        <h4 className="sectionTitle">Age Demographics</h4>
                        <div className="horizontalContainer">
                            <BarChart className="chartContainer" data={age} label="Age" class="chart bar" title="Audience Age" />
                            <DoubleBarChart className="chartContainer" data={ageBoth} label1="You (left)" label2="Global (right)" class="chart bar right" colours1="#3280e6" colours2="#9ec8ff" title="Audience Age Comparison (%)" />
                        </div>

                        <hr />

                        <h4 className="sectionTitle">Tag Distribution</h4>
                        <div className="horizontalContainer">
                            <DoubleBarChart className="chartContainer" data={artistTagsBoth} label1="You (left)" label2="Global (right)" class="chart bar wide" tilt="true"
                                colours1={getColours(getIDsFromNames(tagList, artistTagsBoth.labels), true)}
                                colours2={getColours(getIDsFromNames(tagList, artistTagsBoth.labels), false)}
                                title="Tag Usage Comparison (%)"
                                hasSecondaryAxis
                            />
                        </div>
                        <div className="horizontalContainer">
                            <DoughnutChart className="chartContainer" data={artistTags} class="chart doughnut" colours={getColours(getIDsFromNames(tagList, artistTags.labels), true)} title="Your Tag Usage" />
                            <DoughnutChart className="chartContainer" data={tagsGlobal} class="chart doughnut right" colours={getColours(getIDsFromNames(tagList, tagsGlobal.labels), true)} title="Global Tag Usage" />
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <div>
                    <div>
                        <h4 className="sectionTitle">Auction Purchase Details</h4>
                        <div className="horizontalContainer">
                            <Tile title="Sum of Transactions" value={buyerSingles.TotalSpent} prefix="$" accent="accent blue" />
                            <Tile title="Average Product Price" value={buyerSingles.AverageProductPrice} prefix="$" accent="accent blue" />
                        </div>

                        <hr />

                        <h4 className="sectionTitle">Tag Distribution</h4>
                        <div className="horizontalContainer">
                            <DoughnutChart className="chartContainer" data={buyerTags} class="chart doughnut" colours={getColours(getIDsFromNames(tagList, buyerTags.labels), true)} title="Your Tag Interest" />
                            <DoughnutChart className="chartContainer" data={tagsGlobal} class="chart doughnut right" colours={getColours(getIDsFromNames(tagList, tagsGlobal.labels), true)} title="Global Tag Interest" />
                        </div>
                    </div>
                </div>
            </TabPanel>
        </Tabs>
    );
}

function emptyDisplayOverlay() {
    return(
        <div className="overlay">
            <h4 className="overlayText">
                No data to display
            </h4>
        </div>
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
        ret.push(baseList[idList[i] - 1]);
    }

    return ret;
}

export default AnalyticsPage;