/// <reference path="../node_modules/angular2/ts/typings/node/node.d.ts"/>
/// <reference path="./typings/main/ambient/express/index.d.ts"/>
/// <reference path="./typings/main/ambient/body-parser/index.d.ts"/>
/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>

import * as express from "express";
import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import {Credentials} from "./credentials";
import {Promise} from "es6-promise";
import {DB} from "./db";
import * as bodyParser from "body-parser";

let app = express();
let insecure = express();

let HTTPS_PORT = 8443;
let HTTP_PORT = 8080;

/**
 * Called when any insecure get request is made. Redirects to the secure side
 * of the server.
 */
insecure.get("*", (req, res) => {
  res.redirect(`https://flashbangsplat.com${req.url}`);
});

insecure.listen(HTTP_PORT, () => { // TODO: Add HSTS header.
  console.log(`Listening on port ${HTTP_PORT}`);
});

let OPTIONS = { // Toggle top and bottom files for local and remote server.
  // key: fs.readFileSync("../../secrets/flashbangsplat/privkey.pem"),
  // cert: fs.readFileSync("../../secrets/flashbangsplat/cert.pem")
  key: fs.readFileSync("/home/ethan/Desktop/secrets/privkey.pem"),
  cert: fs.readFileSync("/home/ethan/Desktop/secrets/cert.pem")
};

app.use(bodyParser.json());
app.use("/app", express.static(`${__dirname}/../app`));
app.use("/css", express.static(`${__dirname}/../css`));
app.use("/node_modules", express.static(`${__dirname}/../node_modules`));

/* This lets all /diet/ urls be resolved by the front end, while everything /
 * is resolved by the server. */
app.get("/", (req, res) => {
  res.redirect("/diet/");
});

app.get("/diet/*", (req, res) => {
  res.sendFile("/index.html", { "root": __dirname + "/../" });
});

/**
 * Endpoint for creating a new user.
 */
app.post("/app/submitcreds", (req, res) => {
  DB.addUser(req.body.username, req.body.password, (err) => {
    if (err) { // called if an error occurs
      console.error(err);
      res.status(400).send(err);
    } else { // called if no error
      console.log("I'm in server.ts /app/submitcreds working");
      res.sendStatus(201);
    }
  });
});

/**
 * Endpoint for logging in an existing user.
 */
app.post("/app/dologin", (req, res) => {
  DB.checkCredentials(req.body.username, req.body.password)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
});

/**
 * Endpoint for checking a JWT.
 */
app.post("/app/checkjwt", (req, res) => {
  let jwt = Credentials.checkJWT(req.body.jwt);
  res.send(jwt);
});

/**
 * Endpoint for submitting daily form.
 */
app.post("/app/submitdaily", (req, res) => {
  DB.handleDailyForm(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err).status(400));
});

app.get("/app/entries", (req, res) => {
  DB.getEntries(Number(req.headers["userid"]))
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
});

app.delete("/app/entries", (req, res) => {
  let entryId = Number(req.headers["entryid"]);
  let userId = Number(req.headers["userid"]);
  DB.deleteEntry(entryId, userId)
    .then(() => res.sendStatus(204)) // TODO: Refactor to avoid refresh
    .catch(e => res.status(400).send(e));
});

https.createServer(OPTIONS, app).listen(HTTPS_PORT, () => {
  console.log(`Listening on port ${HTTPS_PORT}`);
});
