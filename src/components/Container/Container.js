import React, { Component } from "react";
import "./Container.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
    FacebookShareButton,
    TwitterShareButton,
    EmailShareButton
} from "react-share";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deletePost(postId) {
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("/api/post/" + postId).then(resp => {
                console.log(resp);
                toast.error("Post deleted. Will apply after refresh");
            });
        }
    }

    render() {
        // let tagsToRender = this.props.tags
        //     ? this.props.tags.map((val, i) => {
        //           return (
        //               <div key={i} className="tag-wrapper">
        //                   {val}
        //               </div>
        //           );
        //       })
        //     : null;
        return (
            <div className="container-comp">
                <div className="container-comp_header">
                    <div className="container-comp_sub-header">
                        <h1>{this.props.title}</h1>
                        <div className="published-by">
                            {this.props.category === "relationship"
                                ? "Lady Ann."
                                : "Pankaata"}
                        </div>
                        <div className="published-date">
                            <div>{this.props.creation_date}</div>
                            <div style={{ marginTop: "5px" }}>
                                {this.props.time}
                            </div>
                        </div>
                    </div>
                    {this.props.admin ? (
                        <div className="admin-controls-container">
                            <Link to={`/editpost/${this.props.postId}`}>
                                <i className="far fa-edit" />
                            </Link>
                            <i
                                onClick={() =>
                                    this.deletePost(this.props.postId)
                                }
                                className="far fa-trash-alt"
                            />
                        </div>
                    ) : null}
                </div>
                <div>{this.props.children}</div>
                {/* <div className="tags-container">{tagsToRender}</div> */}
                <div className="share-container">
                    <h5>Share this post:</h5>
                    <div className="share-button-container">
                        <FacebookShareButton
                            quote={`Look what I found on pankaata.com ${
                                this.props.title
                            }`}
                            url={"facebook.com"}
                            children={
                                <i
                                    style={{ color: "#3B5998" }}
                                    className="fab fa-facebook-square"
                                />
                            }
                        />
                    </div>
                    <div className="share-button-container">
                        <EmailShareButton
                            subject={`Look what I found on pankaata.com ${
                                this.props.title
                            }`}
                            url={"email"}
                            children={<i className="far fa-envelope" />}
                        />
                    </div>
                    <div className="share-button-container">
                        <TwitterShareButton
                            title={`Look what I found on pankaata.com ${
                                this.props.title
                            }`}
                            via={"Pankaata"}
                            url={"twitter"}
                            children={
                                <i
                                    style={{ color: "#1DA1F2" }}
                                    className="fab fa-twitter"
                                />
                            }
                        />
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        );
    }
}

export default Container;

Container.defaultProps = {
    tags: []
};
