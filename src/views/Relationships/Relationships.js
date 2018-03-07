import React, { Component } from "react";
import "./Relationships.css";
import Navbar from "../../components/Navbar/Navbar";
import { Route } from "react-router-dom";
import Videos from "./Videos/Videos";
import Letters from "./Letters/Letters";
import Email from "./Email/Email";
import About from "./About/About";

class Relationships extends Component {
    render() {
        return (
            <div>
                <Navbar ladyAnn={true} />
                Relationships
                <Route path={"/relationships/videos"} component={Videos} />
                <Route path={"/relationships/letters"} component={Letters} />
                <Route path={"/relationships/email"} component={Email} />
                <Route path={"/relationships/about"} component={About} />
            </div>
        );
    }
}

export default Relationships;
