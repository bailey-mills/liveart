import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import "./PasswordReset.css";
import InputGroup from 'react-bootstrap/InputGroup'
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function PasswordReset(props) {
    const [validated, setValidated] = useState(false);
    const [currentpassword, setCurrentPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    let currentUsername = localStorage.getItem('user');;

  const handleSubmit = (event) => {
    setError("");
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log("current", currentpassword);
    console.log("new", newpassword);
    console.log("confirm", confirmpassword);
    if(newpassword!==confirmpassword)
    {
        setError("Your confirming password does not match the new password!")
    }
    else
    {
        const reset = {"Username" : currentUsername, "CurrentPassword" : currentpassword, "NewPassword" : newpassword};
        //send to backend
        axios.patch('/user/updatePassword', reset)
        .then(res=>{
            
            if(res.status===200)
            {
                alert("successed");
            }
        
        })
        .catch(function (error) {          
            if(error.response.status===401)
            {                
                alert("You entered the wrong current password!");
            }
            else if(error.response.status===404)
            {
                alert("User not found");
            }
        })
    }

    setValidated(true);
    }

  return (
    <div >
    <Navbar />
    <div className="main-body">
        <Sidebar username={currentUsername}/>
        <div className="content-body">
            <div className="text-center pt-5">
                <h1>Reset Your Password</h1>
            </div>
        <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row className="justify-content-md-center">
                <Form.Group as={Col} md="3" controlId="validationCustom00" >
                    <Form.Label>Enter Your Current Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={currentpassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required 
                    maxlength="20"
                    minlength="8"      
                    />                          
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>

                <Form.Row className="justify-content-md-center">
                <Form.Group as={Col} md="3" controlId="validationCustom01" >
                    <Form.Label>Enter the New Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    maxlength="20"
                    minlength="8"      
                    />                          
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers, and
                        must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </Form.Group>
                </Form.Row>

                <Form.Row className="justify-content-md-center">
                <Form.Group as={Col} md="3" controlId="validationCustom03" >
                    <Form.Label>Confirm Your New Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    maxlength="20"
                    minlength="8"      
                    />                          
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
                <Form.Row className="justify-content-md-center mt-5 text-danger">

                    {error}




                </Form.Row>
                <Form.Row className="justify-content-md-center mt-5">


                    <Button type="submit" >Confirm</Button>


                </Form.Row>
        </Form>
    
        
        </div>
    </div>
    </div>
    );

}

export default PasswordReset;