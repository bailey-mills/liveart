import React, { Component } from 'react';
import './Navbar.css'
import logo from '../../Assets/logo/logo2.png';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
        localStorage.removeItem('user');
        window.location.reload();
    }

    render() {
        const user = localStorage.getItem('user')
        let profile;
        if(user=== null)
        {
             profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             <Link  to={"/login"} > <Button>Log in</Button> </Link>
             <Link  to={"/register"}><Button>Sign Up</Button></Link>
            </div>;
        }
        else
        {
            console.log(user);
            profile =   <div className="sign-btn">
             {/* <Button>Log in</Button> */}
             <Link className="nav-links" to={"/events"} > {user} </Link>
             <Button onClick={this.logoutuser}>Log out</Button>
            </div>;
        }
        return(       
            <div>
                <nav className="NavbarItems">
                    {/* logo */}
                    <a href="/" className="navbar-img"><img src={logo} alt="logo" className="navbar-img"/> </a>
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