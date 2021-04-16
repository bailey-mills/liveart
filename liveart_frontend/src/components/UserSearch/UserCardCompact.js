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


function UserCard(props){
    return(
        <Card>
            <Card.Body>
                <Image style={{ width: '40px' }} src={props.User.ProfileImage} roundedCircle />
                <Card.Link style={{ margin: '20px' }} href={"/user/"+ props.User.Username}>{props.User.Username}</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default UserCard;