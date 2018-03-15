import React, { Component } from "react";
import PostContainer from "../../components/PostContainer/PostContainer";
import "../Entertainment/Entertainment.css";

class ThousandWords extends Component {
    render() {
        return (
            <div className="entertainment-container">
                <PostContainer category="thousand" />
            </div>
        );
    }
}

export default ThousandWords;
