import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";

//COMPONENTS
import Home from "./views/Home/Home";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import WorthyNews from "./views/WorthyNews/WorthyNews";
import Motivational from "./views/Motivational/Motivational";
import Food from "./views/Food/Food";
import Animal from "./views/Animal/Animal";
import Post from "./views/Post/Post";
import EditPost from "./views/EditPost/EditPost";
import FourOhFour from "./views/FourOhFour/FourOhFour";
import Footer from "./components/Footer/Footer";
import Entertainment from "./views/Entertainment/Entertainment";
import ThousandWords from "./views/ThousandWords/ThousandWords";
import SinglePost from "./views/SinglePost/SinglePost";
import Password from "./views/Password/Password";

import ReactGA from "react-ga";
ReactGA.initialize(process.env.REACT_APP_ANALYTICS, {
    debug: false,
    gaOptions: { cookieDomain: "none" }
});

function withTracker(WrappedComponent, options = {}) {
    const trackPage = page => {
        ReactGA.set({
            page,
            ...options
        });
        ReactGA.pageview(page);
    };

    const HOC = class extends Component {
        componentDidMount() {
            const page = this.props.location.pathname;
            trackPage(page);
        }

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };

    return HOC;
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={withTracker(Home)} />

                    <Route path="/admin" component={withTracker(AdminLogin)} />
                    <Route
                        path="/worthynews"
                        component={withTracker(WorthyNews)}
                    />
                    <Route
                        path="/motivational"
                        component={withTracker(Motivational)}
                    />
                    <Route path="/food" component={withTracker(Food)} />
                    <Route path="/animal" component={withTracker(Animal)} />
                    <Route path="/post" component={withTracker(Post)} />
                    <Route path="/password" component={withTracker(Password)} />
                    <Route
                        path="/singlepost/:id"
                        component={withTracker(SinglePost)}
                    />
                    <Route
                        path="/thousandwords"
                        component={withTracker(ThousandWords)}
                    />
                    <Route
                        path="/editpost/:id"
                        component={withTracker(EditPost)}
                    />
                    <Route
                        path="/entertainment"
                        component={withTracker(Entertainment)}
                    />

                    {/* <Route path="/:postId" component={withTracker(Animal)} /> */}
                    <Route component={withTracker(FourOhFour)} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
