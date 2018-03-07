import React, { Component } from "react";
import "./Relationships.css";
import Navbar from "../../components/Navbar/Navbar";
import { Route } from "react-router-dom";
import Videos from "./Videos/Videos";

class Relationships extends Component {
    render() {
        return (
            <div>
                <Navbar ladyAnn={true} />
                Relationships
                <Route path={"/relationships/videos"} component={Videos} />
            </div>
        );
    }
}

export default Relationships;
