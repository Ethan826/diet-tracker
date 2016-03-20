"use strict";
var sqlite3_1 = require("sqlite3");
var es6_promise_1 = require("es6-promise");
var fs = require("fs");
var credentials_1 = require("./credentials");
var DB_PATH = "/home/ethan/db.db";
var DB = (function () {
    function DB() {
    }
    DB.addUser = function (username, password, cb) {
        var db = new sqlite3_1.Database(DB_PATH);
        credentials_1.Credentials.hashNewCredentials(username, password)
            .then(function (data) {
            db.run("insert into users (username, salt, hashedpwd) values (?, ?, ?)", [data.username, data.salt, data.hash], cb);
            db.close();
        });
    };
    DB.isUserAdmin = function (userId) {
        var db = new sqlite3_1.Database(DB_PATH);
        return new es6_promise_1.Promise(function (resolve, reject) {
            db.get("select * from users where id=? limit 1;", [userId], function (err, results) {
                if (results) {
                    var r = results.admin === 1 ? true : false;
                    resolve(r);
                }
                else {
                    reject(err);
                }
            });
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
                            resolve({
                                success: true,
                                jwt: credentials_1.Credentials.makeJWT(username, dbResults.id, dbResults.admin)
                            });
                        }
                        else {
                            reject({ success: false, error: "Bad password" });
                        }
                    })
                        .catch(function (credErr) {
                        reject({ success: false, error: credErr });
                    });
                }
                else {
                    console.log(dbErr);
                    reject({ success: false, error: "Username or database error" });
                }
            });
        });
    };
    DB.handleDailyForm = function (formOutput) {
        var db = new sqlite3_1.Database(DB_PATH);
        console.log(formOutput);
        return new es6_promise_1.Promise(function (resolve, reject) {
            db.run("\n      INSERT INTO entries (bedtimebool, bedtimetext, carbsscore,\n                           carbstext, cravingscore, cravingtext,\n                           date, energyscore, energytext,\n                           hungerscore, hungertext, movementbool,\n                           movementtext, satietyscore, satietytext,\n                           stressambool, stresspmbool, userId,\n                           walksbool, wellbeingscore, wellbeingtext)\n                   VALUES (?, ?, ?,\n                           ?, ?, ?,\n                           ?, ?, ?,\n                           ?, ?, ?,\n                           ?, ?, ?,\n                           ?, ?, ?,\n                           ?, ?, ?)", [
                formOutput["bedtimebool"], formOutput["bedtimetext"], formOutput["carbsscore"],
                formOutput["carbstext"], formOutput["cravingscore"], formOutput["cravingtext"],
                formOutput["date"], formOutput["energyscore"], formOutput["energytext"],
                formOutput["hungerscore"], formOutput["hungertext"], formOutput["movementbool"],
                formOutput["movementtext"], formOutput["satietyscore"], formOutput["satietytext"],
                formOutput["stressambool"], formOutput["stresspmbool"], formOutput["userId"],
                formOutput["walksbool"], formOutput["wellbeingscore"], formOutput["wellbeingtext"]
            ], function (err) {
                db.close();
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    };
    DB.getKeys = function (objects) {
        return Object
            .keys(objects)
            .filter(function (object) { return objects.hasOwnProperty(object); });
    };
    DB.setupDatabase = function () {
        try {
            fs.unlinkSync(DB_PATH);
        }
        catch (err) { }
        var db = new sqlite3_1.Database(DB_PATH);
        try {
            db.serialize(function () {
                db.run("\n          CREATE TABLE users (\n            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n            username TEXT NOT NULL UNIQUE,\n            salt TEXT NOT NULL,\n            hashedpwd TEXT NOT NULL,\n            admin INTEGER NOT NULL DEFAULT 0\n          );\n       ");
                db.run("\n          CREATE TABLE entries (\n            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,\n            date TEXT NOT NULL UNIQUE,\n            hungerscore INTEGER NOT NULL,\n            hungertext TEXT,\n            cravingscore INTEGER NOT NULL,\n            cravingtext TEXT,\n            satietyscore INTEGER NOT NULL,\n            satietytext TEXT,\n            energyscore INTEGER NOT NULL,\n            energytext TEXT,\n            wellbeingscore INTEGER NOT NULL,\n            wellbeingtext TEXT,\n            carbsscore INTEGER NOT NULL,\n            carbstext TEXT,\n            stressambool INTEGER NOT NULL,\n            stresspmbool INTEGER NOT NULL,\n            walksbool INTEGER NOT NULL,\n            movementbool INTEGER NOT NULL,\n            movementtext TEXT,\n            bedtimebool INTEGER NOT NULL,\n            bedtimetext TEXT,\n            userid INTEGER NOT NULL,\n            FOREIGN KEY(userid) REFERENCES user(id)\n          );\n       ");
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
