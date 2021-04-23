/**
 * @file Tag.js - The source code of the tag selection component
 * @author Eric Lin & Bailey Mills
 * 
 */  
import React, {useState, useEffect} from 'react';
import Select from "react-select";
import {Multiselect} from "multiselect-react-dropdown";
import tagsample from "../../../Assets/TagSample.json";
import "./Tag.css";
import axios from "axios";


export default function Tag(props){

    const [options] = useState(tagsample);
    const [selected, setSelected] = useState([]);
    const [tags, setTags] = useState([]);
    // let events = [];

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/all-tags').then(res=>{
            if(res.status===200)
            {
                setTags(res.data);
            }
        })
    },[]);

    /**
     * @method selectChange 
     * @description Tag multiselect list onSelect changed event hanlder
     * @param {selectedList} - the list with selected tags
     * @returns {null} - none
     */

    function selectChange(selectedList, selectedItem)
    {
        //console.log(selectedList);
        setSelected([selectedList]);
        //console.log("local", selected);
        props.onSelectedTag(selectedList);
    }



    return(
        <div style={{width:"300px"}}>
            <Multiselect 
                options={tags} 
                displayValue="Name" 
                selectedValues={props.currentTags} 
                onSelect={selectChange} 
                onRemove={selectChange} 
                avoidHighlightFirstOption="true" 
                closeOnSelect="false" 
                placeholder="Pick some tags!"
            />
        </div>
    );

}