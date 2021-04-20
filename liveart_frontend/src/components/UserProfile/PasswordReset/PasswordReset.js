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
import { useHistory } from "react-router-dom";

function PasswordReset(props) {
    let history = useHistory();
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

    if(newpassword!==confirmpassword)
    {
        setError("New passwords do not match.");
    }
    else
    {
        const reset = {
            Username : currentUsername,
            CurrentPassword : currentpassword,
            NewPassword : newpassword
        };

        //send to backend
        axios.patch(process.env.REACT_APP_SERVER + '/user/updatePassword', reset)
            .then(res=>{            
                console.log(res);
                if(res.status===200)
                {
                    setValidated(true);
                }        
            })
            .catch(function (error) {
                let message = "";
                if (error && error.response && error.response.data && error.response.data.message) {
                    message = error.response.data.message;
                }
                setError(message);
                setValidated(false);
            })
        }
    }

  return (
    <div >
    <Navbar />
    <div className="main-body">
        <Sidebar username={currentUsername}/>
        <div className="content-body">
            <div className="text-center pt-5">
                <h2>Change Your Password</h2>
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
                    maxLength="20"
                    minLength="8"      
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
                    maxLength="20"
                    minLength="8"      
                    />                          
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
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
                    maxLength="20"
                    minLength="8"      
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