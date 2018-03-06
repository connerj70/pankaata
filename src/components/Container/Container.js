import React, { Component } from "react";
import "./Container.css";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.admin);
        return (
            <div className="container-comp">
                <div className="container-comp_header">
                    <h1>{this.props.title}</h1>
                    {this.props.admin ? (
                        <div className="admin-controls-container">
                            <i className="far fa-edit" />
                            <i className="far fa-trash-alt" />
                        </div>
                    ) : null}
                </div>
                <div>{this.props.children}</div>
                <div className="tags-container">{this.props.tags}</div>
            </div>
        );
    }
}

export default Container;
