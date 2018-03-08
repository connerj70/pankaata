import React, { Component } from "react";
import "./PostContainer.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], searchTerm: "" };

        this.handleSearchTerm = this.handleSearchTerm.bind(this);
        this.handleSearchEnter = this.handleSearchEnter.bind(this);
        this.clearSearchTerm = this.clearSearchTerm.bind(this);
    }

    componentDidMount() {
        axios.get("/api/posts/" + this.props.category).then(resp => {
            this.setState({
                posts: resp.data
            });
        });
    }

    handleSearchTerm(e) {
        this.setState({
            searchTerm: e
        });
    }

    handleSearchEnter() {
        axios.get("/api/posts?q=" + this.state.searchTerm).then(resp => {
            this.setState({ posts: resp.data });
        });
    }

    clearSearchTerm() {
        this.setState(
            {
                searchTerm: "",
                offset: 0
            },
            () => {
                axios
                    .get("/api/posts?offset=" + this.state.offset)
                    .then(resp => {
                        this.setState({ posts: resp.data });
                    });
            }
        );
    }

    render() {
        var postsToRender = this.state.posts.map((value, i) => {
            if (value.type === "twitter") {
                return (
                    <Container
                        admin={this.state.loggedIn}
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                    >
                        <div className="media-wrapper">
                            <TwitterTweetEmbed tweetId={value.url} />
                        </div>
                    </Container>
                );
            } else if (value.type === "instagram") {
                return (
                    <Container
                        admin={this.state.loggedIn}
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                    >
                        <Link to={value.url}>
                            {" "}
                            <div className="media-wrapper">
                                <InstagramEmbed
                                    url={value.url}
                                    hideCaption={false}
                                    containerTagName="div"
                                />
                            </div>
                        </Link>
                    </Container>
                );
            } else if (value.type === "youtube") {
                return (
                    <Container
                        admin={this.state.loggedIn}
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                    >
                        <div className="media-wrapper">
                            <YouTube videoId={value.url} />
                        </div>
                    </Container>
                );
            } else {
                return null;
            }
        });

        return (
            <div>
                <Navbar
                    secondaryNav={false}
                    handleSearchTerm={this.handleSearchTerm}
                    handleSearchEnter={this.handleSearchEnter}
                    clearSearch={this.clearSearchTerm}
                    searchTerm={this.state.searchTerm}
                />
                {postsToRender}
            </div>
        );
    }
}

export default PostContainer;
