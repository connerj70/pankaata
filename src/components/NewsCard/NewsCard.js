import React, { Component } from "react";
import "./NewsCard.css";
import letters from "../../assets/letters.jpg";

class NewsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [
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
            ]
        };
    }
    render() {
        let month = "";
        let monthNum = "";
        let dayNum = "";
        let yearNum = "";
        let hour = "";
        let minutes = "";
        let aOrP = "";
        if (this.props.creation_date) {
            monthNum = this.props.creation_date.split("/")[0];
            dayNum = this.props.creation_date.split("/")[1];
            yearNum = this.props.creation_date.split("/")[2];
            month = this.state.months[monthNum - 1];
        }
        if (this.props.time) {
            if (this.props.time.split(":")[0] > 12) {
                hour = this.props.time.split(":")[0] - 12;
                minutes = this.props.time.split(":")[1];
                aOrP = "P.M.";
            } else {
                hour = this.props.time.split(":")[0];
                minutes = this.props.time.split(":")[1];
                aOrP = "A.M.";
            }
        }
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
                                <div className="published-date">
                                    <div>
                                        Published On:{" "}
                                        {month + " " + dayNum + ", " + yearNum}{" "}
                                        at{" "}
                                        {hour +
                                            ":" +
                                            minutes +
                                            " " +
                                            aOrP +
                                            " (ET)"}
                                    </div>
                                </div>
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
