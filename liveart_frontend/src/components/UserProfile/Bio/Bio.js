import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./Bio.css";
import sampleuser from "../../../Assets/userSample.json"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Tag from "../../Profile/Tag/Tag";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";




function Bio(props){
    const [show, setShow] = useState(false);
    const handleClose = () => {setChangeAvatar(""); setShow(false)};
    const handleShow = () => setShow(true);
    const [changeavatar, setChangeAvatar] = useState("");

    const [validated, setValidated] = useState(false);
    const [avatar, setAvatar] = useState(sampleuser[0].AvatarURL);
    const [birthday, setBirthday] = useState(sampleuser[0].Birthday);
    const [street, setStreet] = useState(sampleuser[0].Street);
    const [city, setCity] = useState(sampleuser[0].City);
    const [province, setProvince] = useState(sampleuser[0].Province);
    const [postalcode, setPostalCode] = useState(sampleuser[0].PostalCode);
    const [selectedtags, setSelectedtags] = useState([]);
    const [currenttags, setCurrenetTags] = useState([{"ID":1,"Name":"Realism","Summary":null},{"ID":2,"Name":"Photorealism","Summary":null}]);

    // console.log(props.match.params.username);
    let currentUsername = localStorage.getItem('user');;
    if(currentUsername===null)
    {
        //jump to login page
    }


    console.log(sampleuser);


    const handleSubmit = (event) => {

      if (false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else
      {    
        event.preventDefault();
        event.stopPropagation();


        //post
        // axios.post('http://localhost:5000/user/register', newUser)
        // .then(res=>{
        //     console.log("post return code: " +res.status);
        //     if(res.status===500)
        //     {                

        //     }           
        // })


      }
      setValidated(true);
      
    };

    function handleChangeAvatar(){
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
                            value={sampleuser[0].Username}
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
                            value={sampleuser[0].Email}
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
                        <Form.Control
                        type="text"
                        value={province} 
                        onChange={e => setProvince(e.target.value)}  
                        required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid province.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Form.Row>

                    {/* tags */}
                    <Form.Row className="register-row">
                        <Form.Group as={Col} md="3" controlId="validationCustom08">
                            <Form.Label>Add some tags for yourself!</Form.Label>
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
                        <input value={changeavatar} onChange={(e) => setChangeAvatar(e.target.value)} className="form-control input-lg"></input>
                    </Row>                   
                    <Row>
                        <Image src={changeavatar} roundedCircle alt="avatar" className="bio-avatar"/>                

                    </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>             
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleChangeAvatar}>Add</Button>
                
                </Modal.Footer>
        </Modal>

        </div>
    );

}

export default Bio;