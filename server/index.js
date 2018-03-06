require("dotenv").config();
const express = require("express"),
    axios = require("axios"),
    cors = require("cors"),
    massive = require("massive"),
    session = require("express-session"),
    bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("massive connected");
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

//ADMIN ENDPOINTS
app.post("/api/admin", function(req, res) {
    const db = req.app.get("db");
    db
        .check_admin([req.body.username, req.body.password])
        .then(resp => {
            console.log(resp);
            if (resp.length !== 0) {
                req.session.user = { username: resp[0].username };
                console.log(req.session);
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
    console.log(req.session.user);
    if (req.session.user) {
        res.status(200).send(true);
    } else {
        res.send(false);
    }
});

//POSTS ENDPOINTS
app.get("/api/posts", function(req, res) {
    const db = req.app.get("db");
    const offset = req.query.offset;
    if (req.query.q) {
        db.search_posts([req.query.q]).then(resp => {
            res.status(200).send(resp);
        });
    } else {
        console.log(offset);
        db
            .get_posts([offset])
            .then(resp => {
                console.log("GET POSTS RESP", resp);
                for (let i = 0; i < resp.length; i++) {
                    db.get_tags([resp[i].post_id]).then(resp2 => {
                        console.log("RESP2", resp2);
                        resp[i].tags = [];
                        for (let j = 0; j < resp2.length; j++) {
                            resp[i].tags.push(resp2[j].name);
                            console.log(resp[i]);
                            if (i === resp.length - 1) {
                                console.log("OBJ", resp);
                                res.status(200).send(resp);
                            }
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});

app.post("/api/posts", function(req, res) {
    var { title, type, url } = req.body;
    var tags = req.body.tags.split(",");
    tags = tags.map(val => val.trim());
    console.log(tags);
    const db = req.app.get("db");
    db
        .create_post([title, type, url])
        .then(resp => {
            console.log("CREATE POST RESP", resp);
            for (let i = 0; i < tags.length; i++) {
                db.create_tag([tags[i]]).then(resp2 => {
                    db
                        .create_post_tag([resp[0].post_id, resp2[0].tag_id])
                        .then(resp3 => {
                            console.log("RESP3", resp3);
                        });
                });
            }
            res.status(200).send(resp);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get("/api/post/:id", function(req, res) {
    const db = req.app.get("db");

    db.get_post([req.params.id]).then(resp => {
        console.log(resp);
        let obj = resp[0];
        obj.tags = [];
        db.get_tags([req.params.id]).then(resp2 => {
            console.log(resp2);
            for (let i = 0; i < resp2.length; i++) {
                obj.tags.push(resp2[i].name);
            }
            console.log("OBJ", obj);
            res.status(200).send(resp);
        });
    });
});

const PORT = 3030;

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}...`);
});
