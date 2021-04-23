/**
 * @file Register.js - The source code of the register form component
 * @author Eric Lin & Bailey Mills
 * 
 */  
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Register.css";
import Navbar from "../Navbar/Navbar";
import { useHistory } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Tag from "../Profile/Tag/Tag";
import axios from "axios";

function Register() {
    const [pwd,setPwd] = useState("");
    const [cfmpwd,setCfmpwd] = useState("");
    const [validated, setValidated] = useState(false);
    const [pwdnotmatch, setPwdnotmatch] = useState("");
    const [selectedtags, setSelectedtags] = useState([]);
    const [allprovince, setAllprovince] = useState([]);
    const [noprovinceselected, setNoprovinceselected] = useState("");

    let pwdFlag = false;
    let provinceFlag = false;
    let history = useHistory();

    useEffect(()=>{
        axios.get(process.env.REACT_APP_SERVER + '/provinces').then(res=>{
            console.log("return code: " +res.status);
            if(res.status!==200)
            {
                alert("Can't connect to the backend");
                return;
            }
            
            setAllprovince(res.data);
            // console.log("res.data",res.data);
        })
    },[]);


    /**
     * @method handleSubmit 
     * @description Register form submit event handler - Send all user inputs to the server to register
     * @param {event} - target form
     * @returns {null} - none
     */

    const handleSubmit = (event) => {

        console.log("from Tag object",selectedtags);
        console.log("selectedPronviceID",event.target[8].value);


        setPwdnotmatch("");
        setNoprovinceselected("");
        if(pwd!==cfmpwd)
        {
            setPwdnotmatch("Password not match. Please check!")
            setValidated(false);
            pwdFlag = false;
        }
        else if(event.target[8].value === "-1")
        {
            console.log("haven't select a pro");
            setNoprovinceselected("You have to select a province!");
            setValidated(false);
            provinceFlag = false;
        }
        else
        {           
            setValidated(true);
            pwdFlag = true;
            provinceFlag = true;
        }

      const form = event.currentTarget;
      if (form.checkValidity() === false || pwdFlag === false || provinceFlag===false) {
        event.preventDefault();
        event.stopPropagation();
      }
      else
      {
        
        event.preventDefault();
        event.stopPropagation();


        let userData = [event.target[0].value,event.target[1].value,event.target[2].value,event.target[4].value,event.target[5].value,event.target[6].value,event.target[7].value,event.target[8].value,selectedtags];
        console.log("user data", userData);
        //let sampleTags = [1,3,5];
        //add province on UI
        let newUser = [{'Email': event.target[0].value, 'Username':event.target[1].value, 'Password':event.target[2].value,'Birthday':event.target[4].value,'Street':event.target[5].value,'City':event.target[6].value,'Postalcode': event.target[7].value, 'ProvinceID': Number(event.target[8].value),'Tags': selectedtags}];
        console.log("new user",newUser);
        console.log("birthday: ", event.target[4].value);

        //post
        axios.post(process.env.REACT_APP_SERVER + '/user/register', newUser)
        .then(res=>{
            console.log("post return code: " +res.status);
            
            if(res.status===201)
            {
                console.log("return message", res.data.message);

                history.push({
                pathname: '/login',
                state: { registered: true }
                });
            }
        
        })
        .catch(function (error) {          
            if(error.response.status===500)
            {                
                alert("Can't connect to the backend");
            }
            else if(error.response.status===403)
            {
                alert("The email/Username is occupied, Please try another one");
            }
        })


      }
      setValidated(true);
      
    };


  return (
    <div >
    <Navbar />
    <div className="home-page-content">
    <div className="register-body">
    <h1 className="register-title">LIVE.ART Sign up</h1>
    <Form noValidate validated={validated} onSubmit={handleSubmit} >
        {/* -------------------------------------------------------------------- */}
        <Form.Row className="register-row">
            <Form.Group as={Col} md="3" controlId="validationCustom00">
            <Form.Label>Email</Form.Label>
            <Form.Control
                required
                type="email"
                placeholder="abc@example.com"
            />
            <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
            </Form.Control.Feedback>
            </Form.Group>
            
        </Form.Row>
        <Form.Row className="register-row">
        <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
                <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                />
                <Form.Control.Feedback type="invalid">
                Please provide a username.
                </Form.Control.Feedback>
            </InputGroup>
            </Form.Group>
        </Form.Row>
      {/* ---------------------------------------------------------------- */}
        <Form.Row className="register-row">
            <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required 
            maxLength="20"
            minLength="8"      
            />
            
            <Form.Control.Feedback type="invalid">
                Please provide a valid password.
            </Form.Control.Feedback>
            </Form.Group>
            </Form.Row>

            <Form.Row className="register-row">

            <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Confirm Password</Form.Label>
            <input

            type="password" 
            placeholder="Password" 
            value={cfmpwd}
            onChange={(e) => setCfmpwd(e.target.value) }
            maxLength="20"
            minLength="6"      
            className="confirm-password"
            
            />
            <text className="password-notmatch">{pwdnotmatch}</text>

            {/* <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback> */}
            </Form.Group>
            
        </Form.Row>

        <Form.Row className="register-row">
            <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Birthday</Form.Label>
            <Form.Control 
            type="date" 
            required     
            />
            
            <Form.Control.Feedback type="invalid">
                Please provide a valid birthday.
            </Form.Control.Feedback>
            </Form.Group>
        </Form.Row>

        <hr className="divide-line"/>
      {/* ---------------------------------------------------------------- */}
        <Form.Row className="register-row">
            <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Street</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Unit number, Street number, Street name" 
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
            <Form.Control type="text" placeholder="City" required />
            <Form.Control.Feedback type="invalid">
                Please provide a valid city.
            </Form.Control.Feedback>
            </Form.Group>
            

      <Form.Group as={Col} md="1" controlId="validationCustom07">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Postal Code" required />
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
                <option value="-1" selected="selected">-- Select a Province --</option>
                {allprovince.map((province, index) => <option key={province.ID} value={province.ID}>{province.Name}</option>)}
            </select>
            <text className="password-notmatch">{noprovinceselected}</text>
        </Form.Group>
        </Form.Row>

      {/* ---------------------------------------------------------------- */}
        <hr className="divide-line"/>

        <div className="register-tagbox register-row">
            <Form.Label>Add some tags of interest!</Form.Label>
            <Tag onSelectedTag={setSelectedtags}/> 
        </div>

        <hr className="divide-line"/>
        
        <div  className="register-row">
        <br />
        <Form.Row className="register-row">
        <Form.Group className="register-row">
            <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            />
        </Form.Group >
        </Form.Row >
        <Form.Row className="register-row">
           
        <Button type="submit" className="register-row">Submit form</Button>
        </Form.Row >
        <br />
        </div>
        
    </Form>
    
        
        
    </div>
    </div>
    </div>
    );
}

export default Register;