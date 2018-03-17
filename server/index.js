require("dotenv").config();
const express = require("express"),
    axios = require("axios"),
    cors = require("cors"),
    massive = require("massive"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer"),
    smtpTransport = require("nodemailer-smtp-transport"),
    initialSession = require("./middlewares/checkForSession").checkForSession;

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("massive connected");
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use((req, res, next) => initialSession(req, res, next));

//ADMIN ENDPOINTS
app.post("/api/admin", function(req, res) {
    const db = req.app.get("db");
    db
        .check_admin([req.body.username, req.body.password])
        .then(resp => {
            if (resp.length !== 0) {
                req.session.user = {
                    username: resp[0].username,
                    firstVisit: false,
                    subscribed: true
                };
                res.status(200).send(resp);
            } else {
                res.status(401).send(resp);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get("/api/admin", function(req, res) {
    if (req.session.user.username) {
        res.status(200).send(true);
    } else {
        res.send(false);
    }
});

//USER ENDPOINTS
app.get("/api/check-user", function(req, res) {
    let firstVisit;
    let subscribed;
    if (req.session.user.firstVisit) {
        firstVisit = true;
    } else {
        firstVisit = false;
    }
    if (!req.session.user.subscribed) {
        subscribed = false;
    } else {
        subscribed = true;
    }
    res.status(200).send({ firstVisit, subscribed });
});

app.post("/api/user-subscribe", function(req, res) {
    req.session.user.subscribed = true;
    res.status(200).send("User Subscribed");
});

//POSTS ENDPOINTS

app.delete("/api/post/:id", function(req, res) {
    const db = req.app.get("db");
    db.delete_post_tags([req.params.id]).then(resp => {
        db.delete_post([req.params.id]).then(resp => {
            res.status(200).send("post deleted");
        });
    });
});

app.get("/api/get-count", function(req, res) {
    const db = req.app.get("db");
    db
        .count_posts()
        .then(resp => {
            res.status(200).send(resp);
        })
        .catch(err => res.status(500).send(err));
});

app.get("/api/posts", function(req, res) {
    const db = req.app.get("db");
    const offset = req.query.offset;
    if (req.query.q) {
        db.search_posts([req.query.q]).then(resp => {
            res.status(200).send(resp);
        });
    } else {
        db
            .get_posts([offset])
            .then(resp => {
                res.status(200).send(resp);
            })
            .catch(err => {});
    }
});

app.get("/api/posts/:category", function(req, res) {
    const db = req.app.get("db");
    const { category } = req.params;
    db.posts_by_category([category]).then(resp => {
        res.status(200).send(resp);
    });
});

app.post("/api/posts", function(req, res) {
    var { title, type, url, category, description } = req.body;
    var tags = req.body.tags.split(",");
    tags = tags.map(val => val.trim());
    let x = new Date();

    var day = x.getDate();
    var month = x.getMonth() + 1;
    var year = x.getFullYear();
    var hour = x.getHours();
    var minutes = x.getMinutes();

    let date = `${month}/${day}/${year}`;
    let time = `${hour}:${minutes}`;

    const db = req.app.get("db");
    db
        .create_post([title, type, url, category, date, time, description])
        .then(resp => {
            for (let i = 0; i < tags.length; i++) {
                db.create_tag([tags[i]]).then(resp2 => {
                    db
                        .create_post_tag([resp[0].post_id, resp2[0].tag_id])
                        .then(resp3 => {
                            if (i === tags.length - 1) {
                                res.status(200).send(resp);
                            }
                        });
                });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.put("/api/posts", function(req, res) {
    const db = req.app.get("db");
    var { title, type, url, category, id } = req.body;

    db.edit_post([title, url, type, category, +id]).then(resp => {
        res.status(200).send(resp);
    });
});

app.get("/api/post/:id", function(req, res) {
    const db = req.app.get("db");

    db.get_post([req.params.id]).then(resp => {
        console.log(resp);
        // let obj = resp[0];
        // obj.tags = [];
        // db.get_tags([req.params.id]).then(resp2 => {
        //     for (let i = 0; i < resp2.length; i++) {
        //         obj.tags.push(resp2[i].name);
        //     }

        // });
        res.status(200).send(resp);
    });
});

//TAG ENDPOINTS
app.get("/api/tags", function(req, res) {
    const db = req.app.get("db");
    db.get_all_tags().then(resp => {
        res.status(200).send(resp);
    });
});

const PORT = 3030;

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}...`);
});
