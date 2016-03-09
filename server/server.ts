/// <reference path="./typings/main/ambient/node/node.d.ts"/>
/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import * as express from "express";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import {Credentials} from "./credentials";
import {Promise} from "es6-promise";
import * as bodyParser from "body-parser";

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
  // key: fs.readfilesync("../../secrets/flashbangsplat/privkey.pem"),
  // cert: fs.readfilesync("../../secrets/flashbangsplat/cert.pem")
  key: fs.readFileSync("/home/ethan/Desktop/temp/privkey.pem"),
  cert: fs.readFileSync("/home/ethan/Desktop/temp/cert.pem")
}

app.use(bodyParser.json());
app.use("/app", express.static(`${__dirname}/../app`));
app.use("/css", express.static(`${__dirname}/../css`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));

app.get("/", (req, res) => {
  res.redirect("/diet/")
});

app.get("/diet/*", (req, res) => {
  res.sendFile("/index.html", {"root": __dirname + "/../"});
});

app.post("/app/submitcreds", (req, res) => {
  let c = Credentials.hashNewCredentials(req.body.username, req.body.password);
  c.then(data => res.send(data)).catch(error => console.error(error));
})

https.createServer(OPTIONS, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}`);
});
