/**
 * @file UserCardCompact.js - The source code of the user info card compact component
 * @author Bailey Mills
 * 
 */
import React, {useState, useEffect} from "react";
import Events from "../../Assets/sampleEvents.json";
import Tags from "../../Assets/TagSample.json";
import EventSection from "../EventSection/EventSection";
import Select from "react-select";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';


function UserCardCompact(props){
    return(
        <Card>
            <Card.Body>
                <Image style={{ width: '40px', height:'40px', objectFit:'cover' }} src={props.User.ProfileImage} roundedCircle />
                <Card.Link style={{ margin: '20px' }} href={"/user/"+ props.User.Username}>{props.User.Username}</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default UserCardCompact;