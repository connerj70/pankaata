import React, { Component } from "react";
import "./WorthyNews.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

class WorthyNews extends Component {
    componentDidMount() {}

    render() {
        return (
            <div className="worthy-news-container">
                <Navbar />
                <div className="home_inner-posts-sidebar-container">
                    <div className="left-post-container" />
                    <Sidebar search={this.handleTagClick} />
                </div>
            </div>
        );
    }
}

export default WorthyNews;
