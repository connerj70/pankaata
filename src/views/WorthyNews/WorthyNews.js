import React, { Component } from "react";
import "./WorthyNews.css";

import PostContainer from "../../components/PostContainer/PostContainer";

class WorthyNews extends Component {
    componentDidMount() {}

    render() {
        return (
            <div className="worthy-news-container">
                <PostContainer category="news" />
            </div>
        );
    }
}

export default WorthyNews;
