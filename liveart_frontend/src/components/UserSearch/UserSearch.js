import React, {useState, useEffect} from "react";
import Events from "../../Assets/sampleEvents.json";
import Tags from "../../Assets/TagSample.json";
import EventSection from "../EventSection/EventSection";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./UserSearch.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import UserCard from"./UserCard";

function UserSearch(){

    const [searchinput, setSearchInput] = useState("");
    const [searchresult, setSearchResult] = useState("Enter user name to search");

    let userA = 
        {
            "Username": "EricLin11",
            "Email": "lin@test.com",
            "Password": "12345678",
            "Birthday": "1999-04-14",
            "Street": "123 Street",
            "City": "Waterloo",
            "Province": "ON",
            "PostalCode": "N2LXXX",
            "Tags":[1,3,5],
            "AvatarURL": "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"
        };
    

    function handleSearch(){
        console.log("cliked");


        // if return status is ....
        setSearchResult(
        <div>


        </div>);

        //else
    }

    return(
        <div>
            <Navbar/>
            <div className="shadow p-2 mb-3 mt-2 bg-body rounded ">
                <div className=" vertical-center h3 mb-0 ">
                    Search a User
                    <input type="text" className="ml-3" value={searchinput} onChange={(e) => setSearchInput(e.target.value)}></input>
                    <Button className="ml-3 vertical-center" onClick={handleSearch}>Search</Button>

                </div>

            </div>
            <div className="usersearch-result">
                {searchresult}
                <UserCard User={userA} />
                <UserCard User={userA} />

                

            </div>
        </div>
    );
    
}


export default UserSearch;