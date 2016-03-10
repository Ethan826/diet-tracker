"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
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
    console.log("Getting to server.ts");
    db_1.DB.addUser(req.body.username, req.body.password, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(201);
        }
    });
});
https.createServer(OPTIONS, app).listen(HTTPS_PORT, function () {
    console.log("Listening on port " + HTTPS_PORT);
});
