import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";

//COMPONENTS
import Home from "./views/Home/Home";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import WorthyNews from "./views/WorthyNews/WorthyNews";
import Motivational from "./views/Motivational/Motivational";
import Food from "./views/Food/Food";
import Animal from "./views/Animal/Animal";
import Relationships from "./views/Relationships/Relationships";
import Post from "./views/Post/Post";
import EditPost from "./views/EditPost/EditPost";
import AdminLetters from "./views/AdminLetters/AdminLetters";
import LetterDetails from "./views/LetterDetails/LetterDetails";
import FourOhFour from "./views/FourOhFour/FourOhFour";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/admin/letters" component={AdminLetters} />
                    <Route path="/admin/letter/:id" component={LetterDetails} />
                    <Route path="/admin" component={AdminLogin} />
                    <Route path="/worthynews" component={WorthyNews} />
                    <Route path="/motivational" component={Motivational} />
                    <Route path="/food" component={Food} />
                    <Route path="/animal" component={Animal} />
                    <Route path="/relationships" component={Relationships} />
                    <Route path="/post" component={Post} />
                    <Route path="/editpost/:id" component={EditPost} />
                    <Route component={FourOhFour} />
                </Switch>
            </div>
        );
    }
}

export default App;
