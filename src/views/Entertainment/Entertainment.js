import React, { Component } from "react";
import PostContainer from "../../components/PostContainer/PostContainer";
import "./Entertainment.css";

class Entertainment extends Component {
    render() {
        return (
            <div className="entertainment-container">
                <PostContainer category="entertainment" />
            </div>
        );
    }
}

export default Entertainment;
