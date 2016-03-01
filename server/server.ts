/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as express from "express";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";

let app = express();
let insecure = express();

let HTTPS_PORT = 8443;
let HTTP_PORT = 8080;

insecure.get("*", (req, res) => {
  res.redirect(`https://flashbangsplat.com${req.url}`);
});

insecure.listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});

let OPTIONS = {
  key: fs.readFileSync("../../secrets/flashbangsplat/privkey.pem"),
  cert: fs.readFileSync("../../secrets/flashbangsplat/cert.pem")
  // key: fs.readFileSync("/home/ethan/Desktop/temp/privkey.pem"),
  // cert: fs.readFileSync("/home/ethan/Desktop/temp/cert.pem")
}

app.use("/app", express.static(`${__dirname}/../app`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));

app.get("/", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

https.createServer(OPTIONS, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}`);
});
