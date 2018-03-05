import React, { Component } from "react";
import "./Container.css";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container-comp">
                <h1>{this.props.title}</h1>
                <div>{this.props.children}</div>
                <div className="tags-container">{this.props.tags}</div>
            </div>
        );
    }
}

export default Container;
