import React, { Component } from "react";
import axios from "axios";
import "./EmailShare.css";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import FacebookProvider, { EmbeddedPost } from "react-facebook";

class EmailShare extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", post: [] };
    }

    handleChange(e) {
        this.setState({
            email: e
        });
    }

    componentDidMount() {
        axios.get("/api/post/" + this.props.match.params.id).then(resp => {
            console.log(resp);
            this.setState({
                post: resp.data
            });
        });
    }

    render() {
        var postsToRender = this.state.post.map((value, i) => {
            if (value.type === "twitter") {
                return (
                    <Container
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
                    >
                        <div className="media-wrapper">
                            <TwitterTweetEmbed tweetId={value.url} />
                        </div>
                    </Container>
                );
            } else if (value.type === "instagram") {
                return (
                    <Container
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
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
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
                    >
                        <div className="media-wrapper">
                            <YouTube videoId={value.url} />
                        </div>
                    </Container>
                );
            } else if (value.type === "facebook") {
                return (
                    <Container
                        key={i}
                        title={value.title}
                        tags={value.tags}
                        postId={value.post_id}
                        creation_date={value.creation_date}
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
            <div className="outer-email-wrapper">
                <div className="email-share-wrapper">
                    <h1>Share with a friend</h1>
                    <div>
                        <h3>To: </h3>
                        <input
                            onChange={e => this.handleChange(e.target.value)}
                            type="text"
                        />
                    </div>
                    <button>Share</button>
                </div>
                {postsToRender}
            </div>
        );
    }
}

export default EmailShare;
