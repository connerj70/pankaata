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
import Ad from "../../components/Ad/Ad";
import Sidebar from "../../components/Sidebar/Sidebar";
import TweetEmbed from "react-tweet-embed";
import ReactGA from "react-ga";
import NewsCard from "../../components/NewsCard/NewsCard";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            loggedIn: false,
            searchTerm: "",
            instagramTest: "",
            totalPosts: null,
            loading: true
        };
        this.handleSearchTerm = this.handleSearchTerm.bind(this);
        this.handleSearchEnter = this.handleSearchEnter.bind(this);
        this.scrollFnc = this.scrollFnc.bind(this);
        this.clearSearchTerm = this.clearSearchTerm.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
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
                                // posts.splice(1, 0, {
                                //     type: "ad",
                                //     title: "Ad"
                                // });
                                this.setState({ posts: posts });
                            });
                    }
                );
            }
        }
    }

    componentDidMount() {
        // var addScript = document.createElement("script");
        // addScript.setAttribute(
        //     "src",
        //     "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        // );
        // document.body.appendChild(addScript);
        window.addEventListener("scroll", e => this.scrollFnc(e));
        axios.get("/api/get-count").then(resp => {
            this.setState({
                count: +resp.data[0].count
            });
        });
        axios.get("/api/admin").then(resp => {
            this.setState({
                loggedIn: resp.data
            });
        });
        if (!this.state.posts.length) {
            axios.get("/api/posts?offset=" + this.state.offset).then(resp => {
                for (let i = 2; i < resp.data.length; i += 3) {
                    resp.data.splice(i, 0, { type: "ad", title: "Ad" });
                }
                this.setState({ posts: resp.data, loading: false });
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
            resp.data = resp.data.filter(value => {
                if (value.category !== "relationship") {
                    return true;
                } else {
                    return false;
                }
            });
            this.setState({ posts: resp.data });
        });
    }

    handleTagClick(q) {
        window.scrollTo(0, 0);
        axios.get("/api/posts?q=" + q).then(resp => {
            resp.data = resp.data.filter(value => {
                if (value.category !== "relationship") {
                    return true;
                } else {
                    return false;
                }
            });

            resp.data.splice(1, 0, { type: "ad", title: "Ad" });

            this.setState({ posts: resp.data });
        });
    }

    sendEvent = event => {
        ReactGA.event({
            category: "button click",
            action: "click",
            label: "next page button clicked"
        });
    };

    loadMore() {
        this.sendEvent();
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
                        time={value.time}
                    >
                        <div className="media-wrapper">
                            {/* <TwitterTweetEmbed tweetId={value.url} /> */}
                            <TweetEmbed id={value.url} />
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
                        time={value.time}
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
                        time={value.time}
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
                        time={value.time}
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
            } else if (value.type === "ad") {
                return (
                    <Container
                        admin={this.state.loggedIn}
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
                        category={value.category}
                        time={value.time}
                    >
                        <div className="media-wrapper">
                            <Ad />
                        </div>
                    </Container>
                );
            } else if (value.type === "news") {
                return (
                    <Container
                        creation_date={value.creation_date}
                        admin={this.state.loggedIn}
                        key={i}
                        tags={value.tags}
                        postId={value.post_id}
                        category={value.category}
                        time={value.time}
                        title={value.title}
                        news={true}
                    >
                        <NewsCard
                            title={value.title}
                            description={value.description}
                            image={value.url}
                            // day={value.creation_date.split("/")[1]}
                            // month={value.creation_date.split("/")[0]}
                        />
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
                    {!this.state.loading ? (
                        <div className="postsToRender-container">
                            <div className="home_inner-posts-sidebar-container">
                                <div className="left-post-container">
                                    {postsToRender}{" "}
                                    {this.state.offset >= 8 ? (
                                        this.state.offset >=
                                        this.state.count ? (
                                            <button
                                                className="return-to-top-button"
                                                onClick={() =>
                                                    window.scrollTo(0, 0)
                                                }
                                            >
                                                All Posts Loaded Return To Top
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => this.loadMore()}
                                                className="next-page-btn"
                                            >
                                                Load More<i
                                                    style={{
                                                        marginLeft: "5px"
                                                    }}
                                                    className="fas fa-arrow-down"
                                                />
                                            </button>
                                        )
                                    ) : null}
                                </div>

                                <Sidebar search={this.handleTagClick} />
                            </div>
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
