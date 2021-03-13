import React from "react";
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
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