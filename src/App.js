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
import Post from "./views/Post/Post";
import EditPost from "./views/EditPost/EditPost";
import FourOhFour from "./views/FourOhFour/FourOhFour";
import Footer from "./components/Footer/Footer";
import Entertainment from "./views/Entertainment/Entertainment";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route path="/admin" component={AdminLogin} />
                    <Route path="/worthynews" component={WorthyNews} />
                    <Route path="/motivational" component={Motivational} />
                    <Route path="/food" component={Food} />
                    <Route path="/animal" component={Animal} />
                    <Route path="/post" component={Post} />
                    <Route path="/editpost/:id" component={EditPost} />
                    <Route path="/entertainment" component={Entertainment} />

                    <Route path="/:postId" component={Animal} />
                    <Route component={FourOhFour} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
