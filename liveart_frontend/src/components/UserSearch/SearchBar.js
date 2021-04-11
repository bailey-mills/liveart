import React, {useState, useEffect} from "react";
import Events from "../../Assets/sampleEvents.json";
import Tags from "../../Assets/TagSample.json";
import EventSection from "../EventSection/EventSection";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import UserCardCompact from"./UserCardCompact";
import "./SearchBar.css"

function SearchBar(){
    const [searchInput, setSearchInput] = useState("");
    const [userList, setUserList] = useState();

    function handleSearch(value){
        let input = value;

        setSearchInput(input);
        
        // Update search results
        if (input && input.length > 0) {
            axios.post(process.env.REACT_APP_SERVER + '/user/search', { Input: input, Count: 6}).then(res=>{
                if(res.status === 200)
                {
                    // Organize results into user objects
                    const items = res.data.map((user) =>
                        <UserCardCompact User={user} />
                    );
                    setUserList(items);
                }
            });
        }
        else {
            setUserList([]);
        }
    }

    function onBlur(e) {
        const currentTarget = e.currentTarget;
        // Check the newly focused element in the next tick of the event loop
        setTimeout(() => {
            // Check if the new activeElement is a child of the original container
            if (!currentTarget.contains(document.activeElement)) {
                setUserList([]);
            }
        }, 0);
    }

    return(
        <div className="searchBar" 
            onBlur={
                (e) => onBlur(e)
            } 
        >
            <div className="searchInputGroup">
                <input type="text" className="searchInput searchInputItem" placeholder="Username" value={searchInput}
                    onFocus={
                        (e) => handleSearch(e.target.value)
                    } 
                    onChange={
                        (e) => handleSearch(e.target.value)
                    }
                >
            </input>
            </div>
            <div className="searchResults">
                {userList}
            </div>
        </div>
    );
    
}


export default SearchBar;