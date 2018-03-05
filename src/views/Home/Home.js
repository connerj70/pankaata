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
            post: ""
        };
    }
    componentDidMount() {
        axios.get("/api/posts").then(resp => {
            this.setState({ post: resp.data });
        });
    }
    render() {
        return (
            <div>
                <Navbar />
                <div
                    style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
                >
                    <Container title="Title" tags="TAGS">
                        <div className="media-wrapper">
                            <TwitterTweetEmbed tweetId="970495554127126528" />
                        </div>
                    </Container>
                    <Container title="Title" tags="TAGS">
                        <div className="media-wrapper">
                            <TwitterTweetEmbed tweetId="970480811492433920" />
                        </div>
                    </Container>
                    <Container title="Title" tags="TAGS">
                        <div className="media-wrapper">
                            <InstagramEmbed
                                url="https://www.instagram.com/p/BUsxGKGgADh/?taken-by=jharris1829"
                                hideCaption={false}
                                containerTagName="div"
                            />
                        </div>
                    </Container>
                    <Container title="Title" tags="TAGS">
                        <div className="media-wrapper">
                            <YouTube videoId="2g811Eo7K8U" />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Home;
