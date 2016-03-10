"use strict";
var sqlite3_1 = require("sqlite3");
var es6_promise_1 = require("es6-promise");
var fs = require("fs");
var credentials_1 = require("./credentials");
var DB_PATH = "./db.db";
var DB = (function () {
    function DB() {
        DB_PATH = DB_PATH;
    }
    DB.addUser = function (username, password, cb) {
        var db = new sqlite3_1.Database(DB_PATH);
        credentials_1.Credentials.hashNewCredentials(username, password)
            .then(function (data) {
            db.run("insert into users (username, salt, hashedpwd) values (?, ?, ?)", [data.username, data.salt, data.hash], cb);
        })
            .catch(function (err) {
            console.error(err);
        });
    };
    DB.checkCredentials = function (username, password) {
        console.log(username);
        var db = new sqlite3_1.Database(DB_PATH);
        return new es6_promise_1.Promise(function (resolve, reject) {
            db.get("select * from users where username=? limit 1;", [username], function (dbErr, dbResults) {
                if (dbResults) {
                    credentials_1.Credentials.getHashedPassword(username, password, dbResults.salt)
                        .then(function (credResults) {
                        if (credResults.hash === dbResults.hashedpwd) {
                            resolve({ success: true, jwt: "Foo" });
                        }
                        else {
                            reject({ success: false, error: "Bad password" });
                        }
                    })
                        .catch(function (credErr) { return reject({ success: false, error: credErr }); });
                }
                else {
                    var e = dbErr || "Database error";
                    reject({ success: false, error: dbErr });
                }
            });
        });
    };
    DB.setupDatabase = function () {
        try {
            fs.unlinkSync(DB_PATH);
        }
        catch (err) { }
        var db = new sqlite3_1.Database(DB_PATH);
        try {
            db.serialize(function () {
                db.run("\n          CREATE TABLE users (\n          \tid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n          \tusername TEXT NOT NULL UNIQUE,\n          \tsalt TEXT NOT NULL,\n          \thashedpwd TEXT NOT NULL\n          );\n       ");
                db.run("\n          CREATE TABLE entries (\n          \tid INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n          \thungerscore INTEGER NOT NULL,\n          \thungertext TEXT,\n          \tcravingscore INTEGER NOT NULL,\n          \tcravingtext TEXT,\n          \tsatietyscore INTEGER NOT NULL,\n          \tsatietytext TEXT,\n          \tenergyscore INTEGER NOT NULL,\n          \tenergytext TEXT,\n          \twellbeingscore INTEGER NOT NULL,\n          \twellbeingtext TEXT,\n          \tcarbsscore INTEGER NOT NULL,\n          \tcarbstext TEXT,\n          \tstressambool INTEGER NOT NULL,\n          \tstresspmbool INTEGER NOT NULL,\n          \twalksbool INTEGER NOT NULL,\n          \tmovementbool INTEGER NOT NULL,\n          \tmovementtext TEXT,\n          \tbedtimebool INTEGER NOT NULL,\n          \tbedtimetext TEXT,\n          \tuserid INTEGER NOT NULL,\n          \tFOREIGN KEY(userid) REFERENCES user(id)\n          );\n       ");
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            db.close();
        }
    };
    return DB;
}());
exports.DB = DB;
