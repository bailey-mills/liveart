import React from "react";
import ReactDOM from "react-dom";
import Slideshow from "./components/SlideShow/__slideshow";
import Navbar from "./components/Navbar/Navbar";
import './components/Navbar/Navbar.css';
import './index.css'
import EventSection from "./components/EventSection/EventSection"
import events from "./Assets/sampleEvents.json"
import { BrowserRouter as Router, Link, Switch, NavLink, Redirect, Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';
// import {Router, IndexRoute, Route} from "react-router-dom"
import EventsPage from "./components/EventsPage/EventsPage";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

class App extends React.Component {



    render(){
        return(
            <React.StrictMode>
                <Router>
                    <Switch>
                        <Route path="/" exact> <HomePage /> </Route>    
                        <Route path="/events" exact> <EventsPage/> </Route>
                        <Route path="/register" exact> <Register/> </Route>
                        <Route path="/login" exact> <Login/> </Route>
                    </Switch>  

                </Router>  
            </React.StrictMode>
        );
    }



}

export default App;