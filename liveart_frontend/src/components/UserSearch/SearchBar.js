/**
 * @file SearchBar.js - The source code of the user searching bar component
 * @author Bailey Mills
 * 
 */
import React, {useState, useEffect} from "react";
import axios from "axios";
import UserCardCompact from"./UserCardCompact";
import "./SearchBar.css"

function SearchBar(){
    const [searchInput, setSearchInput] = useState("");
    const [userList, setUserList] = useState();

    /**
     * @method handleSearch 
     * @description User Searching handlder - send the keyword input to the server
     * @param {string} - value(username)
     * @returns {null} - none
     */
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

    /**
     * @method onBlur 
     * @description Check the newly focused element in the next tick of the event loop
     * @param {event} - target event
     * @returns {null} - none
     */
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