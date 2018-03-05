import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import "./Home.css";
import Container from "../../components/Container/Container";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            loggedIn: false
        };
    }
    componentDidMount() {
        axios.get("/api/admin").then(resp => {
            console.log(resp);
        });

        axios.get("/api/posts?offset=" + this.state.offset).then(resp => {
            console.log(resp);
            this.setState({ posts: resp.data }, () =>
                console.log(this.state.posts)
            );
        });
    }
    render() {
        var postsToRender = this.state.posts.map((value, i) => {
            if (value.type === "twitter") {
                return (
                    <Container key={i} title={value.title} tags={value.tags}>
                        <div className="media-wrapper">
                            <TwitterTweetEmbed tweetId={value.url} />
                        </div>
                    </Container>
                );
            } else if (value.type === "instagram") {
                return (
                    <Container key={i} title={value.title} tags={value.tags}>
                        <div className="media-wrapper">
                            <InstagramEmbed
                                url={value.url}
                                hideCaption={false}
                                containerTagName="div"
                            />
                        </div>
                    </Container>
                );
            } else if (value.type === "youtube") {
                return (
                    <Container key={i} title={value.title} tags={value.tags}>
                        <div className="media-wrapper">
                            <YouTube videoId={value.url} />
                        </div>
                    </Container>
                );
            }
        });

        return (
            <div>
                <Navbar />
                <div
                    style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                >
                    {postsToRender}
                </div>
            </div>
        );
    }
}

export default Home;
