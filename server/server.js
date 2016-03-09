"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
var credentials_1 = require("./credentials");
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
    var c = credentials_1.Credentials.hashNewCredentials(req.body.username, req.body.password);
    c.then(function (data) { return res.send(data); }).catch(function (error) { return console.error(error); });
});
https.createServer(OPTIONS, app).listen(HTTPS_PORT, function () {
    console.log("Listening on port " + HTTPS_PORT);
});
