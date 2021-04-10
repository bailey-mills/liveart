import React from "react";
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import EventsPage from "./components/EventsPage/EventsPage";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Bio from "./components/UserProfile/Bio/Bio";
import DataVis from "./components/UserProfile/DataVis/DataVis";
import SubsEvents from "./components/UserProfile/SubsEvents/SubsEvents";
import PlannedEvents from "./components/UserProfile/PlannedEvents/PlannedEvents";
import SoldProduct from "./components/UserProfile/ProductPage/SoldProduct/SoldProduct";
import PurchasedProduct from "./components/UserProfile/ProductPage/PurchasedProduct/PurchasedProduct";
import Follower from "./components/UserProfile/Follower/Follower";
import Following from "./components/UserProfile/Following/Following";
import PasswordReset from "./components/UserProfile/PasswordReset/PasswordReset";
import NewEvent from "./components/UserProfile/NewEvent/NewEvent";
import Contactus from "./components/Contactus/Contactus";

import Auction from "./components/Auction/Auction";


class App extends React.Component {



    render(){
        return(
            // <React.StrictMode>

                <Router>
                    <Switch>
                        <Route path="/" exact component={HomePage} />    
                        <Route path="/events" exact component={EventsPage} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/contactus" exact component={Contactus} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/user/:username" exact component ={HomePage} />
                        <Route path="/userprofile/bio" exact component ={Bio} />
                        <Route path="/userprofile/datavis" exact component ={DataVis} />
                        <Route path="/userprofile/subsevents" exact component ={SubsEvents} />
                        <Route path="/userprofile/plannedevents" exact component ={PlannedEvents} />
                        <Route path="/userprofile/soldproducts" exact component ={SoldProduct} />
                        <Route path="/userprofile/purchasedproducts" exact component ={PurchasedProduct} />
                        <Route path="/userprofile/follower" exact component ={Follower} />
                        <Route path="/userprofile/following" exact component ={Following} />
                        <Route path="/userprofile/passwordreset" exact component ={PasswordReset} />
                        <Route path="/userprofile/newevent" exact component ={NewEvent} />

                        <Route path="/auction/:username" exact component ={Auction} />
                    </Switch>  

                </Router>  
            // </React.StrictMode>
        );
    }



}

export default App;