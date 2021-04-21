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


function UserCard(props){
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.User.ProfileImage} />
            <Card.Body>
                <Card.Title>{props.User.Username}</Card.Title>
                <Card.Text>{props.User.ProvinceName}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Followers: {props.User.SubscribedByCount}</ListGroupItem>
                <ListGroupItem>Following: {props.User.SubscribedToCount}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={"/user/"+ props.User.Username}>Go to this user's profile</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default UserCard;