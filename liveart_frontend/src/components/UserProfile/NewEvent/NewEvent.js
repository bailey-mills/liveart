/**
 * @file NewEvent.js - The source code of the new event creating sub-page component 
 * @author Eric Lin & Bailey Mills
 * 
 */ 
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./NewEvent.css";
import InputGroup from 'react-bootstrap/InputGroup'
import Card from 'react-bootstrap/Card';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Tag from "../../Profile/Tag/Tag";
import ImageUploader from 'react-images-upload';
import axios from "axios";
import { useHistory } from "react-router-dom";



function NewEvent(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState("");
    const [startdate, setStartdate] = useState("");
    const [starttime, setStarttime] = useState("");
    const [enddate, setEnddate] = useState("");
    const [endtime, setEndtime] = useState("");
    const [category, setCategory] = useState(-1);
    const [thumbnail, setThumbnail] = useState("");
    const [newitemname, setNewitemname] = useState("");
    const [newitemdescrption, setNewitemdescription] = useState("");
    const [newitemprice, setNewitemprice] = useState(0);
    const [newitemtags, setNewitemtags] = useState([]);
    // const [newitemimages, setNewitemimages] = useState([]);
    const [newitemimages, setNewitemimages] = useState("");

    const [newitems,setNewitems] = useState([]);

    const [categoryList, setCategoryList] = useState();

    let history = useHistory();

    let currentUsername = localStorage.getItem('user');

    function onDrop(picture) {
        setNewitemimages(newitemimages.concat(picture));
    }

    /**
     * @method handleNewItem 
     * @description New item adding button handler - Add the new item into the item list
     * @param {null} - none
     * @returns {null} - none
     */
    function handleNewItem(){
        const newitem = {'Name': newitemname, 'Description': newitemdescrption, 'BasePrice': newitemprice, 'Tags': newitemtags, 'URL': newitemimages};
        console.log(newitem);
        
        setNewitems(newitems.concat(newitem));

        setShow(false);

        setNewitemname("");
        setNewitemdescription("");
        setNewitemprice(0);
        setNewitemtags([]);
        setNewitemimages([]);
    }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/categories')
        .then(res=>{
            if(res.status===200)
            {
                setCategoryList(res.data);
            }
        
        })
    },[])


    /**
     * @method handleDelete 
     * @description Item deleting in the list event handler - Delete the certain item from the new event list
     * @param {index} - index of the item in the list
     * @returns {null} - none
     */
    function handleDelete(index){
        let buf = [];   
        for(var i=0; i<newitems.length; i++){
            if(i!== index.index)
            {
                buf = buf.concat(newitems[i]);
            }
        }   
        setNewitems(buf);
        
    }

    /**
     * @method handleCreate 
     * @description Event creating button handler - Send all data about the new creating event to the server
     * @param {null} - index of the item in the list
     * @returns {null} - none
     */
    function handleCreate()
    {
        const event = {
            "EventTitle" : title,
            "StartTime" : startdate + " " + starttime,
            "EndTime" : enddate + " " + endtime,
            "CategoryID": category,
            "URL": thumbnail,
            "Items" : newitems
        };

        console.log(event);

        //set to backend

        //redirect to event page
        let userID = localStorage.getItem('userID');
        axios.post(process.env.REACT_APP_SERVER + '/event/createEvent/' + userID, event)
        .then(res=>{
            if(res.status===200)
            {
                history.push({
                    pathname: '/userprofile/plannedevents',
                });
            }
        
        })
    }

  return (
    <div >
        <Navbar />
        <div className="main-body">
        <Sidebar username={currentUsername}/>
        <div className="content-body">
        <div className="text-center pt-5">
                <h1>Create a New Event</h1>
        </div>
        <Container>
          <Row>
            <Col>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Event Title</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // aria-label="Username"
                // aria-describedby="basic-addon1"
                />
            </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Event ThumbNail</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Event ThumbNailURL"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                // aria-label="Username"
                // aria-describedby="basic-addon1"
                />
            </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
                <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="date"
                    value={startdate}
                    onChange={(e) => setStartdate(e.target.value)}
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col xs={6}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Start Time</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="time"
                    value={starttime}
                    onChange={(e) => setStarttime(e.target.value)}
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
                <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="date"
                    value={enddate}
                    onChange={(e) => setEnddate(e.target.value)}
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col xs={6}>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">End Time</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="time"
                    value={endtime}
                    onChange={(e) => setEndtime(e.target.value)}
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
          </Row>
          <Row>
            <InputGroup className="mb-3">
                    <InputGroup.Prepend >
                    <InputGroup.Text id="basic-addon1" >Select a Category for the Event</InputGroup.Text>
                    </InputGroup.Prepend>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setCategory(e.target.value)}>
                        <option value="-1" selected="selected">-- Select a Category --</option>
                        {categoryList ? categoryList.map((category, index) => <option key={category.ID} value={category.ID}>{category.Name}</option>) : ''}
                    </select>
            </InputGroup>
          </Row>
          <Row>
            <Col >
            <Button variant="primary" onClick={handleShow}>
               Add an Item
            </Button> 
            </Col>
          </Row>
          <br/>
          <Row>
            
            {
                newitems.map((item,index) => {
                    console.log(item);
                    return(
                        <Card style={{ width: '18rem' }} key={index} className="m-2">
                            <Card.Img 
                                width={171}
                                height={180} 
                                variant="top" 
                                src={item.URL} 
                                alt={item.Name}
                                style={{objectFit:"contain"}} 
                            />
                            <Card.Body>
                                <Card.Title>{item.Name}</Card.Title>
                                <Card.Text>
                                Desciption: {item.Description}
                                </Card.Text>
                                <Card.Text>
                                Base Price: ${item.BasePrice}
                                
                                </Card.Text>

                                <Card.Text>
                                Tags: {item.Tags.map((tag,index)=>{
                                    return(
                                        <li key={index}>{tag.Name}</li>
                                    );
                                })}
                                </Card.Text>
                                <Button variant="danger" onClick={() => handleDelete({index})} >Delete</Button>
                            </Card.Body>
                        </Card>
                        
                        );
                    
                })
            }
          </Row>
          <Row className="mt-5 mb-5">
            <Button className="btn-success btn-lg" onClick={handleCreate}>Create the Event</Button>
          </Row>
        </Container>
        </div>
        </div>
        {/*------------------  New Item Modal --------------------------*/}
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
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Item Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="text"
                    value={newitemname}
                    onChange={(e) => setNewitemname(e.target.value) }
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
                </Row>
                <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Item Description</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="text"
                    value={newitemdescrption}
                    onChange={(e) => setNewitemdescription(e.target.value) }
                    
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
                </Row>
                <Row>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Base Price</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="number"
                    value={newitemprice}
                    onChange={(e) => setNewitemprice(e.target.value) }
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
                </Row>
                <Row>
                    {/* Images:
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                        withPreview="true"
                    /> */}
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Image URL</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    type="text"
                    value={newitemimages}
                    onChange={(e) => setNewitemimages(e.target.value) }
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
                    
                </Row>
                <Row>
                <p className="mr-3">Tags:</p>
                    <Tag onSelectedTag={setNewitemtags} /> 
                </Row>
                
            </Container>
            </Modal.Body>
            <Modal.Footer>
                * Make Sure every field is filled. The base price can not be negative *
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={handleNewItem}>Add</Button>
            
            </Modal.Footer>
      </Modal>
    </div>
    );

}

export default NewEvent;