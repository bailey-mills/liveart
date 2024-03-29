/**
 * @file Bio.js - The source code of the User Bio modification sub-page component
 * @author Eric Lin & Bailey Mills
 * 
 */ 
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./Bio.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Tag from "../../Profile/Tag/Tag";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
const moment =  require('moment');

function Bio(props){
    let history = useHistory();

    const [bio, setBio] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => {setChangeAvatar(""); setShow(false)};
    const handleShow = () => {
        setChangeAvatar(avatar);
        setShow(true);
    }
    const [changeavatar, setChangeAvatar] = useState("");

    const [allprovince, setAllprovince] = useState([]);
    const [error, setError] = useState("");
    const [feedback, setFeedback] = useState("");
    const [validated, setValidated] = useState(false);
    const [avatar, setAvatar] = useState("https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");
    const [validAvatar, setValidAvatar] = useState(false);
    const [birthday, setBirthday] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [provinceid, setProvinceID] = useState();
    
    const [postalcode, setPostalCode] = useState("");
    const [selectedtags, setSelectedtags] = useState([]);
    const [currenttags, setCurrenetTags] = useState([]);

    let currentUsername = localStorage.getItem('user');;
    if(currentUsername===null)
    {
        //jump to login page
    }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/user/bio/' + currentUsername).then(res=>{
            if(res.status!==200)
            {
                alert("Can't connect to the backend");
                return;
            }
            
            setBio(res.data);
            setAvatar(res.data.AvatarURL);
            setBirthday(moment(res.data.Birthday).format("YYYY-MM-DD"));
            setStreet(res.data.Address);
            setCity(res.data.City);
            setPostalCode(res.data.PostalCode);
            setCurrenetTags(res.data.Tags);
            setSelectedtags(res.data.Tags);
            setProvinceID(res.data.ProvinceID);
        })

        axios.get(process.env.REACT_APP_SERVER + '/provinces').then(res=>{
            if(res.status!==200)
            {
                alert("Can't connect to the backend");
                return;
            }
            
            setAllprovince(res.data);
        })
    },[]);

    /**
     * @method handleSubmit 
     * @description Bio modification form submit event handler - Send the updated data to the server
     * @param {event} - target form
     * @returns {null} - none
     */
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true && birthday) {
            console.log(event.target[0]);
            console.log(event.target[1].value);
            console.log(event.target[2].value);

            let updatedUser = {
                Avatar: avatar,
                Birthday: moment(event.target[3].value).toISOString(),
                Street:event.target[4].value,
                City:event.target[5].value,
                PostalCode: event.target[6].value,
                ProvinceID: Number(event.target[7].value),
                Tags: selectedtags
            };

            console.log(updatedUser);

            axios.patch(process.env.REACT_APP_SERVER + '/user/updateUser/' + currentUsername, updatedUser).then(res=>{
                if(res.status === 200)
                {
                    history.push({
                        pathname: '/userprofile/bio'
                    });
                }
            });
        }

        setValidated(true);
    };

    /**
     * @method handleChangeAvatar 
     * @description Avatar Changing button hanlder
     * @param {null} - none
     * @returns {null} - none
     */
    function handleChangeAvatar() {
        setAvatar(changeavatar);
        setShow(false);
    }

    return(
        <div>
            <Navbar />
            
            <div className="main-body">
            <Sidebar username={currentUsername}/>
                <div className="content-body">
                <div className="text-center pt-5">
                    <h1>Basic Information</h1>
                </div>
                <Form className="mt-3" noValidate validated={validated} onSubmit={handleSubmit} >
                    {/* username and email --- can not be modified */}
                    
                    <Form.Row className="register-row">        
                        <Image src={avatar} roundedCircle alt="avatar" className="bio-avatar"/>                
                    </Form.Row>
                    <Form.Row className="register-row">
                        <Button onClick={handleShow}>Change Avatar</Button>                 
                    </Form.Row>

                    <Form.Row className="register-row">
                        <Form.Group as={Col} md="3" controlId="validationCustom00">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            value={bio.Username}
                            disabled
                        />
                        </Form.Group>                   
                    </Form.Row>

                    <Form.Row className="register-row">

                        <Form.Group as={Col} md="3" controlId="validationCustom00">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            value={bio.Email}
                            disabled
                        />
                        </Form.Group>                       
                    </Form.Row>

                    {/* birthday */}
                    <Form.Row className="register-row">
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control 
                        type="date"
                        value={birthday} 
                        onChange={e => setBirthday(e.target.value)}                   
                        required     
                        />
                        
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid birthday.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    {/* street, city, province, postalcode */}
                    {/* ---------------------------------------------------------------- */}
                    <Form.Row className="register-row">
                        <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Street</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={street} 
                            onChange={e => setStreet(e.target.value)} 
                            required 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Street.
                        </Form.Control.Feedback>
                        </Form.Group>
                        

                    
                    </Form.Row>
                {/* ---------------------------------------------------------------- */}
                <Form.Row className="register-row">
                <Form.Group as={Col} md="2" controlId="validationCustom06">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={city} 
                        onChange={e => setCity(e.target.value)} 
                        required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                        </Form.Group>
                        

                <Form.Group as={Col} md="1" controlId="validationCustom07">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control 
                        type="text" 
                        value={postalcode} 
                        onChange={e => setPostalCode(e.target.value)}  
                        required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid postal Code.
                        </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="register-row">
                    <Form.Group as={Col} md="3" controlId="validationCustom08">
                        <Form.Label>Province</Form.Label>
                        {/* <Form.Control type="select" placeholder="Province" required /> */}
                        
                        <select className="province-select">
                            <option value="-1" >-- Select a Province --</option>
                            {
                                allprovince.map((province, index) => 
                                {
                                    if(province.ID === provinceid)
                                    {
                                        return(
                                        <option key={province.ID} selected="selected" value={province.ID}>
                                                {province.Name}
                                        </option>
                                        );
                                    }
                                    else
                                    {
                                        return(
                                        <option key={province.ID} value={province.ID}>
                                                {province.Name}
                                        </option>
                                        );
                                    }
                            
                                
                                })
                            }
                        </select>
                        <text className="password-notmatch">{error}</text>
                    </Form.Group>
                    </Form.Row>

                    {/* tags */}
                    <Form.Row className="register-row">
                        <Form.Group as={Col} md="3" controlId="validationCustom08">
                            <Form.Label>Add some tags of interest!</Form.Label>
                            <Tag onSelectedTag={setSelectedtags} currentTags={currenttags}/> 
                        </Form.Group>         
                    </Form.Row>
                    <Form.Row className="justify-content-md-center mt-5">
                    
                    <Button type="submit" >Modify</Button>
                    </Form.Row>
                    
                </Form>
                    
                </div>
                

            </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Add an Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Container>
                    <Row>
                    <h4>Enter the URL of your new Avatar</h4>
                    </Row>
                    <Row>                        
                        <Form.Control 
                            type="text" 
                            value={changeavatar} 
                            onChange={e => setChangeAvatar(e.target.value)} 
                            required
                            className="avatarImage"
                        />
                    </Row>                   
                    <Row>
                        <Image src={changeavatar} roundedCircle alt="avatar" className="bio-avatar"/>                

                    </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleChangeAvatar}>Add</Button>
                </Modal.Footer>
        </Modal>

        </div>
    );

}

export default Bio;