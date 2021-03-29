import React from "react";
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import EventsPage from "./components/EventsPage/EventsPage";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AnalyticsPage from "./components/Analytics/AnalyticsPage";


class App extends React.Component {



    render(){
        return(
            <React.StrictMode>

                <Router>
                    <Switch>
                        <Route path="/" exact component={HomePage} />    
                        <Route path="/events" exact component={EventsPage} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />

                        <Route path="/analytics" exact component={AnalyticsPage} />
                    </Switch>  

                </Router>  
            </React.StrictMode>
        );
    }



}

export default App;