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
        this.state = {
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ]
        };
    }

    deletePost(postId) {
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("/api/post/" + postId).then(resp => {
                toast.error("Post deleted. Will apply after refresh");
            });
        }
    }

    render() {
        let month = "";
        let monthNum = "";
        let dayNum = "";
        let yearNum = "";
        let hour = "";
        let minutes = "";
        let aOrP = "";
        if (this.props.creation_date) {
            monthNum = this.props.creation_date.split("/")[0];
            dayNum = this.props.creation_date.split("/")[1];
            yearNum = this.props.creation_date.split("/")[2];
            month = this.state.months[monthNum - 1];
        }
        if (this.props.time) {
            if (this.props.time.split(":")[0] > 12) {
                hour = this.props.time.split(":")[0] - 12;
                minutes = this.props.time.split(":")[1];
                aOrP = "P.M.";
            } else {
                hour = this.props.time.split(":")[0];
                minutes = this.props.time.split(":")[1];
                aOrP = "A.M.";
            }
        }
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
                        {!this.props.news ? <h1>{this.props.title}</h1> : null}
                        {!this.props.ad ? (
                            <div className="published-date">
                                <div>
                                    Published On:{" "}
                                    {month + " " + dayNum + ", " + yearNum} at{" "}
                                    {hour +
                                        ":" +
                                        minutes +
                                        " " +
                                        aOrP +
                                        " (ET)"}
                                </div>
                            </div>
                        ) : null}
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
                            quote={`Look what I found on www.pankaata.com/#/singlepost/${
                                this.props.postId
                            } ${this.props.title}`}
                            url={"pankaata.com"}
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
                            subject={`Look what I found on www.pankaata.com/#/singlepost/${
                                this.props.postId
                            } ${this.props.title}`}
                            url={`www.pankaata.com/singlepost/${
                                this.props.postId
                            }`}
                            children={<i className="far fa-envelope" />}
                        />
                    </div>
                    <div className="share-button-container">
                        <TwitterShareButton
                            title={`Look what I found on www.pankaata.com/#/singlepost/${
                                this.props.postId
                            } ${this.props.title}`}
                            via={"Pankaata"}
                            url={"pankaata.com"}
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
    tags: [],
    ad: false
};
