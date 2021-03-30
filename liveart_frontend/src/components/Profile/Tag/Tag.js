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
        axios.get('http://localhost:5000/all-tags').then(res=>{
            console.log("return code: " +res.status);
            if(res.status!==200)
            {
                alert("Can't connect to the backend");
                return;
            }
            
            setTags(res.data);
            console.log("tags",tags);
        })
    },[]);

    function selectChange(selectedList, selectedItem)
    {
        console.log(selectedList);
        setSelected([selectedList]);
        console.log("local", selected);
        props.onSelectedTag(selectedList);
    }



    return(
        <div>
            <Multiselect options={tags} displayValue="Name"  onSelect={selectChange} onRemove={selectChange} avoidHighlightFirstOption="true" closeOnSelect="false" placeholder="Pick your tags!"/>
            here: {JSON.stringify(selected)}
        </div>
    );

}