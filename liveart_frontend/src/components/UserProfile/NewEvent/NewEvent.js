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




function NewEvent(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [newitemname, setNewitemname] = useState("");
    const [newitemdescrption, setNewitemdescription] = useState("");
    const [newitemprice, setNewitemprice] = useState(0);
    const [newitemtags, setNewitemtags] = useState([]);
    // const [newitemimages, setNewitemimages] = useState([]);
    const [newitemimages, setNewitemimages] = useState("");

    const [newitems,setNewitems] = useState([]);


    let currentUsername = localStorage.getItem('user');
    if(currentUsername===null)
    {
        //jump to login page
       
    }


    function onDrop(picture) {
        setNewitemimages(newitemimages.concat(picture));
    }

    function handleNewItem(){
        //validator
        // if(!newitemname || !newitemdescrption || newitemprice<=0 || !newitemimages || !newitemtags.length){
        //     return;
        // }

        const newitem = {'ItemName': newitemname, 'ItemDescription': newitemdescrption, 'BasePrice': newitemprice, 'Tags': newitemtags, 'Images': newitemimages};
        console.log(newitem);
        
        setNewitems(newitems.concat(newitem));

        //console.log("list", newitems);

        

        setShow(false);

        setNewitemname("");
        setNewitemdescription("");
        setNewitemprice(0);
        setNewitemtags([]);
        setNewitemimages([]);

        

    }

    useEffect(()=>{
        console.log("list", newitems);

    },[newitems])


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
                    // aria-label="Username"
                    // aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
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
                    return(
                        <Card style={{ width: '18rem' }} key={index}>
                            <Card.Img 
                            width={171}
                            height={180} 
                            variant="top" 
                            src={item.Images} 
                            alt={item.ItemName} />
                            <Card.Body>
                                <Card.Title>{item.ItemName}</Card.Title>
                                <Card.Text>
                                Desciption: {item.ItemDescription}
                                </Card.Text>
                                <Card.Text>
                                Base Price: {item.BasePrice}
                                
                                </Card.Text>
                                <Card.Text>
                                {/* Image: {item.Images.map((image,index)=>{
                                    return(
                                        <div>{image.name} <img href={image.name} alt="i"/></div>
                                        
                                    );
                                })} */}
                                </Card.Text>
                                <Card.Text>
                                Tags: {item.Tags.map((tag,index)=>{
                                    return(
                                        <div key={index}>{tag.Name}</div>
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
                Tags:
                <Tag onSelectedTag={setNewitemtags}/> 
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