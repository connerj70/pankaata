import React, { Component } from "react";
import "./NewsCard.css";
import letters from "../../assets/letters.jpg";

class NewsCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let months = [
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
        ];
        let imgShow;
        if (this.props.image) {
            imgShow = this.props.image;
        } else {
            imgShow = letters;
        }
        return (
            <div>
                <div className="news_container">
                    <div className="post-module">
                        <div className="thumbnail">
                            {/* <div className="date">
                                <div className="day">{this.props.day}</div>
                                <div className="month">
                                    {months[this.props.month]}
                                </div>
                            </div> */}
                            <img src={imgShow} alt="news" />
                        </div>
                        <div className="post-content">
                            <div className="category">News</div>
                            <div className="post-text">
                                <h1 className="title">{this.props.title}</h1>
                                <h2 className="sub_title">
                                    {this.props.subtitle}
                                </h2>
                                <p className="description">
                                    {this.props.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsCard;
