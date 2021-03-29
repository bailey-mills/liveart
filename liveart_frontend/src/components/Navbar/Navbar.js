import React, { Component } from 'react';
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UserProfile from "../UserProfile/Bio/Bio";

class Navbar extends Component {
    constructor(props) {
        super(props);
    
        // This binding is necessary to make `this` work in the callback
        this.logoutuser = this.logoutuser.bind(this);
      }
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    logoutuser(){
        let username = localStorage.getItem('user');
          
        axios.get('http://localhost:5000/user/logout?Username='+username )
        .then(res=>{ 
            if(res.status===205)
            {
                localStorage.removeItem('user');
                window.location.reload();
            }
            else
            {
                alert("Failed to logout");
            }
        })
        
    }

    render() {
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
             <Button onClick={this.logoutuser}>Log out</Button>
            </div>;
        }
        return(       
            <div>
                <nav className="NavbarItems">
                    {/* logo */}
                    <Link className="navbar-links" to={"/"}><img src={logo} alt="logo" className="navbar-img"/> </Link>
                    {/* options */}
                    <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                        <li>
                            <Link className="nav-links" to={"/events"} > Events </Link>
                        </li>
                        <li>
                        <Link className="nav-links" to={"/contactus"} > Contact us </Link>
                        </li>

                    </ul>

                    <div className="menu-icon" onClick={this.handleClick}>
                        <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
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
}

export default Navbar