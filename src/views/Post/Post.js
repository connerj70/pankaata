import React, { Component } from "react";
import "./Post.css";
import Navbar from "../../components/Navbar/Navbar";
import instagram from "../../assets/instagram-example2.png";
import youtube from "../../assets/youtube-example2.png";
import twitter from "../../assets/twitter-example2.png";
import facebook from "../../assets/facebook-example.png";
import axios from "axios";

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            type: "",
            url: "",
            category: "",
            tags: "",
            description: "",
            loggedIn: false
        };
    }

    componentDidMount() {
        axios.get("/api/admin").then(resp => {
            this.setState({
                loggedIn: resp.data
            });
        });
    }

    handleChange(e) {
        var name = e.target.name;
        var value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    handleClick(e) {
        e.preventDefault();
        if (!this.state.title) {
            alert("Please input a title");
        } else if (!this.state.type) {
            alert("Please input a type");
        } else if (!this.state.url) {
            alert("Please input a url");
        } else {
            var { title, type, url, tags, category, description } = this.state;
            axios
                .post("/api/posts", {
                    title,
                    type,
                    url,
                    tags,
                    category,
                    description
                })
                .then(resp => {
                    this.props.history.push("/");
                });
        }
    }

    render() {
        return (
            <div className="post">
                <Navbar secondaryNav={false} />
                {this.state.loggedIn ? (
                    <div className="post_inner-container">
                        <h1>Create New Post</h1>
                        <form>
                            <fieldset>
                                <label>Post Title</label>
                                <input
                                    onChange={e => this.handleChange(e)}
                                    type="text"
                                    name="title"
                                />
                            </fieldset>
                            <fieldset>
                                <label>Post Type</label>
                                <select
                                    name="type"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value={null}>
                                        Select An Option
                                    </option>
                                    <option value="twitter">Twitter</option>
                                    <option value="instagram">Instagram</option>
                                    <option value="facebook">Facebook</option>
                                    <option value="youtube">Youtube</option>
                                    <option value="news">News</option>
                                </select>
                            </fieldset>

                            {this.state.type === "" ? null : this.state.type ===
                            "twitter" ? (
                                <div>
                                    <h3 className="social-helper-h3">
                                        Please copy this number, from the tweet
                                        you would like to post, into the box
                                        below
                                    </h3>
                                    <img
                                        alt="twitter"
                                        className="social-helper-image"
                                        src={twitter}
                                    />
                                    <input
                                        name="url"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="twitter post id"
                                    />
                                </div>
                            ) : this.state.type === "instagram" ? (
                                <div>
                                    <h3 className="social-helper-h3">
                                        Please copy the entire url of the
                                        instagram post your would like to post
                                        into the box below
                                    </h3>
                                    <img
                                        alt="instagram"
                                        className="social-helper-image"
                                        src={instagram}
                                    />
                                    <input
                                        name="url"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="instagram post url"
                                    />
                                </div>
                            ) : this.state.type === "youtube" ? (
                                <div>
                                    <h3 className="social-helper-h3">
                                        Please copy this number from the youtube
                                        video you would like to post into the
                                        box below
                                    </h3>
                                    <img
                                        alt="youtube"
                                        className="social-helper-image"
                                        src={youtube}
                                    />
                                    <input
                                        name="url"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="youtube video id"
                                    />
                                </div>
                            ) : this.state.type === "facebook" ? (
                                <div>
                                    <h3 className="social-helper-h3">
                                        Please copy the entire url of the
                                        facebook page you would like to post
                                        into the box below.
                                    </h3>
                                    <img
                                        alt="facebook"
                                        className="social-helper-image"
                                        src={facebook}
                                    />
                                    <input
                                        name="url"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="facebook url"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <input
                                        name="url"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="news image url"
                                    />
                                    <textarea
                                        style={{
                                            marginTop: "20px",
                                            width: "90%",
                                            minHeight: "100px",
                                            padding: "10px",
                                            boxSizing: "border-box"
                                        }}
                                        name="description"
                                        onChange={e => this.handleChange(e)}
                                        type="text"
                                        placeholder="description"
                                    />
                                </div>
                            )}
                            <fieldset>
                                <label>Category</label>
                                <select
                                    name="category"
                                    onChange={e => this.handleChange(e)}
                                >
                                    <option value={null}>
                                        Select An Option
                                    </option>
                                    <option value="news">Worthy News</option>
                                    <option value="thousand">
                                        Thousand Words
                                    </option>
                                    <option value="motivational">
                                        Motivational Monday
                                    </option>
                                    <option value="food">Food</option>
                                    <option value="relationship">
                                        Relationship
                                    </option>
                                    <option value="animal">Animal World</option>
                                    <option value="entertainment">
                                        Entertainment
                                    </option>
                                    <option value="thousand">
                                        Thousand Words
                                    </option>
                                    <option value="miscellaneous">
                                        Miscellaneous
                                    </option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <label>Tags</label>
                                <input
                                    onChange={e => this.handleChange(e)}
                                    type="text"
                                    name="tags"
                                    placeholder="seperate tags by commas. tag1,tag2,tag3"
                                />
                            </fieldset>

                            <button onClick={e => this.handleClick(e)}>
                                Submit Post
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>Unauthorized</div>
                )}
            </div>
        );
    }
}

export default Post;
