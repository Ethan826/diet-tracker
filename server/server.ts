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
// let insecure = express();

// let HTTPS_PORT = 8443;
let HTTP_PORT = 8081;

/**
 * Called when any insecure get request is made. Redirects to the secure side
 * of the server.
 */
// insecure.get("*", (req, res) => {
//   res.redirect(`https://flashbangsplat.com${req.url}`);
// });

app.use(bodyParser.json());
app.use("/diet-tracker/app", express.static(`${__dirname}/../app`));
app.use("/diet-tracker/css", express.static(`${__dirname}/../css`));
app.use("/diet-tracker/node_modules", express.static(`${__dirname}/../node_modules`));

/* This lets all /diet/ urls be resolved by the front end, while everything /
 * is resolved by the server. */
app.get("/diet-tracker/", (req, res) => {
  res.redirect("/diet-tracker/diet/");
});

app.get("/diet-tracker/diet/*", (req, res) => {
  res.sendFile("index.html", { "root": __dirname + "/../" });
});

/**
 * Endpoint for creating a new user.
 */
app.post("/diet-tracker/app/submitcreds", (req, res) => {
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
app.post("/diet-tracker/app/dologin", (req, res) => {
  DB.checkCredentials(req.body.username, req.body.password)
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
});

/**
 * Endpoint for checking a JWT.
 */
app.post("/diet-tracker/app/checkjwt", (req, res) => {
  let jwt = Credentials.checkJWT(req.body.jwt);
  res.send(jwt);
});

/**
 * Endpoint for submitting daily form.
 */
app.post("/diet-tracker/app/submitdaily", (req, res) => {
  DB.handleDailyForm(req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.send(err).status(400));
});

app.get("/diet-tracker/app/entries", (req, res) => {
  DB.getEntries(Number(req.headers["userid"]))
    .then(results => res.status(200).send(results))
    .catch(err => res.status(400).send(err));
});

app.delete("/diet-tracker/app/entries", (req, res) => {
  let entryId = Number(req.headers["entryid"]);
  let userId = Number(req.headers["userid"]);
  DB.deleteEntry(entryId, userId)
    .then(() => res.sendStatus(204)) // TODO: Refactor to avoid refresh
    .catch(e => res.status(400).send(e));
});

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`Listening on port ${HTTP_PORT}`);
});
