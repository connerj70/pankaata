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
                <div class="container">
                    <div class="post-module">
                        <div class="thumbnail">
                            <div class="date">
                                <div class="day">{this.props.day}</div>
                                <div class="month">
                                    {months[this.props.month]}
                                </div>
                            </div>
                            <img src={imgShow} alt="news" />
                        </div>
                        <div class="post-content">
                            <div class="category">News</div>
                            <div class="post-text">
                                <h1 class="title">{this.props.title}</h1>
                                <h2 class="sub_title">{this.props.subtitle}</h2>
                                <p class="description">
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
