import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import FacebookProvider, { EmbeddedPost } from "react-facebook";
import "./Home.css";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            loggedIn: false,
            searchTerm: "",
            instagramTest: ""
        };
        this.handleSearchTerm = this.handleSearchTerm.bind(this);
        this.handleSearchEnter = this.handleSearchEnter.bind(this);
        this.scrollFnc = this.scrollFnc.bind(this);
        this.clearSearchTerm = this.clearSearchTerm.bind(this);
    }

    scrollFnc(e) {
        const windowHeight =
            "innerHeight" in window
                ? window.innerHeight
                : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if (this.state.searchTerm === "" && this.state.offset < 8) {
                this.setState(
                    prevProps => {
                        return {
                            offset: prevProps.offset + 4
                        };
                    },
                    () => {
                        axios
                            .get("/api/posts?offset=" + this.state.offset)
                            .then(resp => {
                                var posts = this.state.posts.slice();
                                posts = [...posts, ...resp.data];
                                this.setState({ posts: posts });
                            });
                    }
                );
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", e => this.scrollFnc(e));

        axios.get("/api/admin").then(resp => {
            this.setState({
                loggedIn: resp.data
            });
        });
        if (!this.state.posts.length) {
            axios.get("/api/posts?offset=" + this.state.offset).then(resp => {
                this.setState({ posts: resp.data });
            });
        }
    }

    componentWillUnmount() {
        this.setState({
            offset: 0
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

    loadMore() {
        this.setState(
            prevProps => {
                return {
                    offset: prevProps.offset + 4
                };
            },
            () => {
                axios
                    .get("/api/posts?offset=" + this.state.offset)
                    .then(resp => {
                        var posts = this.state.posts.slice();
                        posts = [...posts, ...resp.data];
                        this.setState({ posts: posts });
                    });
            }
        );
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
                        creation_date={value.creation_date}
                        category={value.category}
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
                        creation_date={value.creation_date}
                        category={value.category}
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
                        creation_date={value.creation_date}
                        category={value.category}
                    >
                        <div className="media-wrapper">
                            <YouTube
                                videoId={value.url}
                                opts={{ suggestedQuality: "small" }}
                            />
                        </div>
                    </Container>
                );
            } else if (value.type === "facebook") {
                return (
                    <Container
                        admin={this.state.loggedIn}
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
                        category={value.category}
                    >
                        <div className="media-wrapper">
                            <FacebookProvider
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            >
                                <EmbeddedPost href={value.url} width="500" />
                            </FacebookProvider>
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
                    handleSearchTerm={this.handleSearchTerm}
                    handleSearchEnter={this.handleSearchEnter}
                    clearSearch={this.clearSearchTerm}
                    searchTerm={this.state.searchTerm}
                />
                <div
                    style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                >
                    {this.state.loggedIn ? (
                        <div className="new-post-button-container">
                            <Link to="/post">
                                <button>Create New Post +</button>
                            </Link>
                        </div>
                    ) : null}
                    {this.state.posts.length ? (
                        <div className="postsToRender-container">
                            {postsToRender}
                            {this.state.offset >= 8 ? (
                                <button
                                    onClick={() => this.loadMore()}
                                    className="next-page-btn"
                                >
                                    Load More<i
                                        style={{ marginLeft: "5px" }}
                                        className="fas fa-arrow-down"
                                    />
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        <div className="home_loading">Loading...</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;
