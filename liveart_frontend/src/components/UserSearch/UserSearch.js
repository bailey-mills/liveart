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

    const [searchInput, setSearchInput] = useState("");
    const [userList, setUserList] = useState();

    function handleSearch(e){
        setSearchInput(e.target.value);

        // Get default subscription state
        axios.post(process.env.REACT_APP_SERVER + '/user/search', { Input: e.target.value, Count: 10}).then(res=>{
            if(res.status === 200)
            {
                // Organize results into user objects
                const items = res.data.map((user) =>
                    <UserCard User={user} />
                );
                setUserList(items);
            }
        });
    }

    return(
        <div>
            <Navbar/>
            <div className="shadow p-2 mb-3 mt-2 bg-body rounded ">
                <div className=" vertical-center h3 mb-0 ">
                    Search a User
                    <input type="text" className="ml-3" value={searchInput} onChange={(e) => 
                        handleSearch(e)
                    }></input>
                </div>
            </div>

            <div className="usersearch-result">
                {userList}
            </div>
        </div>
    );
    
}


export default UserSearch;