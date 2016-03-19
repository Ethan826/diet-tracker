"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
var credentials_1 = require("./credentials");
var db_1 = require("./db");
var bodyParser = require("body-parser");
var app = express();
var insecure = express();
var HTTPS_PORT = 8443;
var HTTP_PORT = 8080;
insecure.get("*", function (req, res) {
    res.redirect("https://flashbangsplat.com" + req.url);
});
insecure.listen(HTTP_PORT, function () {
    console.log("Listening on port " + HTTP_PORT);
});
var OPTIONS = {
    key: fs.readFileSync("/home/ethan/Desktop/temp/privkey.pem"),
    cert: fs.readFileSync("/home/ethan/Desktop/temp/cert.pem")
};
app.use(bodyParser.json());
app.use("/app", express.static(__dirname + "/../app"));
app.use("/css", express.static(__dirname + "/../css"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.get("/", function (req, res) {
    res.redirect("/diet/");
});
app.get("/diet/*", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
app.post("/app/submitcreds", function (req, res) {
    db_1.DB.addUser(req.body.username, req.body.password, function (err) {
        if (err) {
            console.error(err);
            res.status(400).send(err);
        }
        else {
            console.log("I'm in server.ts /app/submitcreds working");
            res.sendStatus(201);
        }
    });
});
app.post("/app/dologin", function (req, res) {
    db_1.DB.checkCredentials(req.body.username, req.body.password)
        .then(function (results) { return res.status(200).send(results); })
        .catch(function (err) { return res.status(400).send(err); });
});
app.post("/app/checkjwt", function (req, res) {
    var aud = credentials_1.Credentials.checkJWT(req.body.jwt);
    res.send(aud);
});
app.post("/app/submitdaily", function (req, res) {
    db_1.DB.handleDailyForm(req.body, function (x) { return console.log(x); });
});
https.createServer(OPTIONS, app).listen(HTTPS_PORT, function () {
    console.log("Listening on port " + HTTPS_PORT);
});
