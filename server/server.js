"use strict";
var express = require("express");
var http = require("http");
var credentials_1 = require("./credentials");
var db_1 = require("./db");
var bodyParser = require("body-parser");
var app = express();
var HTTP_PORT = 8081;
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
    var jwt = credentials_1.Credentials.checkJWT(req.body.jwt);
    res.send(jwt);
});
app.post("/app/submitdaily", function (req, res) {
    db_1.DB.handleDailyForm(req.body)
        .then(function () { return res.sendStatus(200); })
        .catch(function (err) { return res.send(err).status(400); });
});
app.get("/app/entries", function (req, res) {
    db_1.DB.getEntries(Number(req.headers["userid"]))
        .then(function (results) { return res.status(200).send(results); })
        .catch(function (err) { return res.status(400).send(err); });
});
app.delete("/app/entries", function (req, res) {
    var entryId = Number(req.headers["entryid"]);
    var userId = Number(req.headers["userid"]);
    db_1.DB.deleteEntry(entryId, userId)
        .then(function () { return res.sendStatus(204); })
        .catch(function (e) { return res.status(400).send(e); });
});
http.createServer(app).listen(HTTP_PORT, function () {
    console.log("Listening on port " + HTTP_PORT);
});
