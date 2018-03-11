import React, { Component } from "react";
import AdSense from "react-adsense";

class Ad extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <div>
                <AdSense.Google
                    client="ca-pub-7292810486004926"
                    slot="7806394673"
                    style={{
                        width: 500,
                        height: 300,
                        margin: "0 auto"
                    }}
                    format=""
                />
            </div>
        );
    }
}

export default Ad;
