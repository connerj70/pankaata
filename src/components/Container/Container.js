import React, { Component } from "react";
import "./Container.css";
import { Link } from "react-router-dom";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                            {this.props.creation_date}
                        </div>
                    </div>
                    {this.props.admin ? (
                        <div className="admin-controls-container">
                            <Link to={`/editpost/${this.props.postId}`}>
                                <i className="far fa-edit" />
                            </Link>
                            <i className="far fa-trash-alt" />
                        </div>
                    ) : null}
                </div>
                <div>{this.props.children}</div>
                {/* <div className="tags-container">{tagsToRender}</div> */}
                <div className="share-container">
                    <h5>Share this post:</h5>
                    <a
                        className="twitter-share-button"
                        href={
                            "https://twitter.com/intent/tweet?text=Checkout%20this%20post%20on%20Pankaata:%20" +
                            this.props.title
                        }
                    >
                        <i
                            style={{ color: "#1DA1F2" }}
                            className="fab fa-twitter"
                        />
                    </a>
                    <Link to={"/email/share/" + this.props.postId}>
                        <i
                            style={{ marginLeft: "10px" }}
                            className="far fa-envelope"
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Container;

Container.defaultProps = {
    tags: []
};
