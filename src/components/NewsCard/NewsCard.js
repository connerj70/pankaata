import React, { Component } from "react";
import "./NewsCard.css";
import letters from "../../assets/letters.jpg";

class NewsCard extends Component {
    render() {
        return (
            <div>
                <div class="container">
                    <div class="post-module">
                        <div class="thumbnail">
                            <div class="date">
                                <div class="day">27</div>
                                <div class="month">Mar</div>
                            </div>
                            <img src={letters} alt="news" />
                        </div>
                        <div class="post-content">
                            <div class="category">News</div>
                            <div class="post-text">
                                <h1 class="title">City Lights in New York</h1>
                                <h2 class="sub_title">
                                    The city that never sleeps.
                                </h2>
                                <p class="description">
                                    New York, the largest city in the U.S., is
                                    an architectural marvel with plenty of
                                    historic monuments, magnificent buildings
                                    and countless dazzling skyscrapers.
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
