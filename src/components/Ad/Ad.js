import React, { Component } from "react";
import AdSense from "react-adsense";

class Ad extends Component {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        const { width, height } = this.props;
        return (
            <div>
                <AdSense.Google
                    client="ca-pub-7292810486004926"
                    slot="7806394673"
                    style={{
                        width: width,
                        height: height,
                        margin: "0 auto"
                    }}
                    format=""
                />
            </div>
        );
    }
}

export default Ad;

Ad.defaultProps = {
    width: 300,
    height: 300
};
