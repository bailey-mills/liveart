import React, { Component } from 'react';
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UserProfile from "../UserProfile/Bio/Bio";
import { useHistory } from "react-router-dom";


function Navbar(){
         
    let clicked =  false;
    let history = useHistory();

    function handleClick(){
        // this.setState({ clicked: !this.state.clicked })
        clicked = !clicked;
    }

    function logoutuser(){
        
        let username = localStorage.getItem('user');
          
        axios.get('http://localhost:5000/user/logout?Username='+username )
        .then(res=>{ 
            if(res.status===205)
            {
                localStorage.removeItem('user');

                // window.location.reload();
                
                history.push({
                    pathname: '/login',
                    state: { registered: false }
                });
            }
            else
            {
                alert("Failed to logout");
            }
        })
        
    }

    
        const user = localStorage.getItem('user');
        let profile;
        if(user=== null)
        {
             profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             {/* <Link  to={"/login"} > <Button>Log in</Button> </Link> */}
             <Link to={{
                pathname: '/login',
                state: { registered: false }
                }}> <Button>Log in</Button> </Link>
             <Link  to={"/register"}><Button>Sign Up</Button></Link>
            </div>;
        }
        else
        {
            console.log(user);
            profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             <Link className="nav-links" to={"/userprofile/bio"} > {user} </Link>
             <Button onClick={logoutuser}>Log out</Button>
            </div>;
        }
        return(       
            <div>
                <nav className="NavbarItems">
                    {/* logo */}
                    <Link className="navbar-links" to={"/"}><img src={logo} alt="logo" className="navbar-img"/> </Link>
                    {/* options */}
                    <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                        <li>
                            <Link className="nav-links" to={"/events"} > Events </Link>
                        </li>
                        <li>
                        <Link className="nav-links" to={"/contactus"} > Contact us </Link>
                        </li>

                    </ul>

                    <div className="menu-icon" onClick={handleClick}>
                        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    
                    

                    {/* sign up
                    <div className="sign-btn">
                        <Button>Log in</Button>
                        <Link  to={"/login"} > <Button>Log in</Button> </Link>
                        <Link  to={"/register"}><Button>Sign Up</Button></Link>
                    </div> */}
                    {profile}

                </nav>
                <br/>
                <br/>
            </div>
        )
    
}

export default Navbar