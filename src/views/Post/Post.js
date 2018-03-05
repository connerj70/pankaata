import React, { Component } from "react";
import "./Post.css";
import Navbar from "../../components/Navbar/Navbar";

class Post extends Component {
    render() {
        return (
            <div className="post">
                <Navbar />
                <div className="post_inner-container">
                    <h1>Create New Post</h1>
                    <form>
                        <label>Post Title</label>
                        <input type="text" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Post;
