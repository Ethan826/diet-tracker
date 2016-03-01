"use strict";
var express = require("express");
var https = require("https");
var fs = require("fs");
var app = express();
var HTTPS_PORT = 8443;
var OPTIONS = {
    key: fs.readFileSync("../../secrets/flashbangsplat/privkey.pem"),
    cert: fs.readFileSync("../../secrets/flashbangsplat/cert.pem")
};
app.get("/", function (req, res) {
    res.send("Hello");
});
https.createServer(OPTIONS, app).listen(HTTPS_PORT, function () {
    console.log("Listening on port " + HTTPS_PORT);
});
