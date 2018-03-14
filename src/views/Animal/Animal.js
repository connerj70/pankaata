import React, { Component } from "react";
import "./Animal.css";
import PostContainer from "../../components/PostContainer/PostContainer";

class Animal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div style={{ minHeight: "85vh" }}>
                <PostContainer category="animal" />
            </div>
        );
    }
}

export default Animal;
