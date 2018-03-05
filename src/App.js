import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";

//COMPONENTS
import Home from "./views/Home/Home";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import WorthyNews from "./views/WorthyNews/WorthyNews";
import Motivational from "./views/Motivational/Motivational";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin" component={AdminLogin} />
                    <Route path="/worthynews" component={WorthyNews} />
                    <Route path="/motivational" component={Motivational} />
                </Switch>
            </div>
        );
    }
}

export default App;
