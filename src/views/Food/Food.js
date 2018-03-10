import React, { Component } from "react";
import "./Food.css";
import PostContainer from "../../components/PostContainer/PostContainer";

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="food-porn-container">
                <PostContainer category="food" />
            </div>
        );
    }
}

export default Food;
