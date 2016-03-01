"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
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
app.use("/app", express.static(__dirname + "/../app"));
app.use("/node_modules", express.static(__dirname + "/../node_modules"));
app.get("/", function (req, res) {
    res.sendFile("/index.html", { "root": __dirname + "/../" });
});
https.createServer(OPTIONS, app).listen(HTTPS_PORT, function () {
    console.log("Listening on port " + HTTPS_PORT);
});
