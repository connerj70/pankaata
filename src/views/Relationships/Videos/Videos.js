import React, { Component } from "react";
import "./Videos.css";
import axios from "axios";
import Container from "../../../components/Container/Container";
import YouTube from "react-youtube";

class Videos extends Component {
    constructor(props) {
        super(props);

        this.state = { videos: [] };
    }

    componentDidMount() {
        axios.get("/api/lady/videos").then(resp => {
            console.log(resp);
            this.setState({
                videos: resp.data
            });
        });
    }

    render() {
        let videosToDisplay = this.state.videos.map((value, i) => {
            if (value.type === "youtube") {
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
            }
        });

        return <div>{videosToDisplay}</div>;
    }
}

export default Videos;
