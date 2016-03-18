/// <reference path="./typings/main/ambient/sqlite3/index.d.ts"/>
/// <reference path="./typings/main/ambient/node/node.d.ts"/>
import * as sqlite3 from "sqlite3";
import {Database} from "sqlite3";
import {Promise} from "es6-promise";
import * as fs from "fs";
import {Credentials} from "./credentials";
import {ICredentials} from "./interfaces";

let DB_PATH = "./db.db";

export class DB {
  static DB_PATH: string;

  constructor() {
    DB_PATH = DB_PATH;
  }

  static addUser(username: string, password: string, cb: Function) {
    let db = new Database(DB_PATH);

    Credentials.hashNewCredentials(username, password)
      .then(data => {
      console.log(data);
      db.run(
        "insert into users (username, salt, hashedpwd) values (?, ?, ?)",
        [data.username, data.salt, data.hash],
        cb
        );
    })
      .catch(err => {
      console.error(err);
    });
  }

  static isUserAdmin(userId: number): Promise<boolean> {
    let db = new Database(DB_PATH);
    return new Promise((resolve, reject) => {
      db.get(
        "select * from users where id=? limit 1;",
        [userId],
        (err, results) => {
          if (results) {
            let r = results.admin === 1 ? true : false;
            resolve(r);
          } else {
            reject(err);
          }
        }
        );
    });
  }

  static checkCredentials(username: string, password: string): Promise<Object> {
    console.log(username);
    let db = new Database(DB_PATH);
    return new Promise((resolve, reject) => {
      db.get(
        "select * from users where username=? limit 1;",
        [username],
        (dbErr, dbResults) => {
          if (dbResults) {
            Credentials.getHashedPassword(username, password, dbResults.salt)
              .then(credResults => {
              if (credResults.hash === dbResults.hashedpwd) {
                resolve({
                  success: true,
                  jwt: Credentials.makeJWT(username, dbResults.id, dbResults.admin)
                });
              } else {
                reject({ success: false, error: "Bad password" });
              }
            })
              .catch(credErr => {
              reject({ success: false, error: credErr });
            });
          } else {
            console.log(dbErr);
            reject({ success: false, error: "Username or database error" });
          }
        }
        );
    });
  }

  static handleDailyForm(formOutput: JSON, cb: Function) {
    let db = new Database(DB_PATH);
    console.log(formOutput);
    db.run(`
      INSERT INTO entries (bedtimebool, bedtimetext, carbsscore,
                           carbstext, cravingscore, cravingtext,
                           date, energyscore, energytext,
                           hungerscore, hungertext, movementbool,
                           movementtext, satietyscore, satietytext,
                           stressambool, stresspmbool, userId,
                           walksbool, wellbeingscore, wellbeingtext)
                   VALUES (?, ?, ?,
                           ?, ?, ?,
                           ?, ?, ?,
                           ?, ?, ?,
                           ?, ?, ?,
                           ?, ?, ?,
                           ?, ?, ?)`,
      [
        formOutput["bedtimebool"], formOutput["bedtimetext"], formOutput["carbsscore"],
        formOutput["carbstext"], formOutput["cravingscore"], formOutput["cravingtext"],
        formOutput["date"], formOutput["energyscore"], formOutput["energytext"],
        formOutput["hungerscore"], formOutput["hungertext"], formOutput["movementbool"],
        formOutput["movementtext"], formOutput["satietyscore"], formOutput["satietytext"],
        formOutput["stressambool"], formOutput["stresspmbool"], formOutput["userId"],
        formOutput["walksbool"], formOutput["wellbeingscore"], formOutput["wellbeingtext"]
      ],
      cb
      );
  }


  static getKeys(objects: { [val: string]: any }) {
    return Object
      .keys(objects)
      .filter(object => { return objects.hasOwnProperty(object); });
  }

  static setupDatabase() {
    try {
      fs.unlinkSync(DB_PATH);
    } catch (err) { }
    let db = new Database(DB_PATH);
    try {
      db.serialize(() => {
        db.run(`
          CREATE TABLE users (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            username TEXT NOT NULL UNIQUE,
            salt TEXT NOT NULL,
            hashedpwd TEXT NOT NULL,
            admin INTEGER NOT NULL DEFAULT 0
          );
       `);
        db.run(`
          CREATE TABLE entries (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
            date TEXT NOT NULL,
            hungerscore INTEGER NOT NULL,
            hungertext TEXT,
            cravingscore INTEGER NOT NULL,
            cravingtext TEXT,
            satietyscore INTEGER NOT NULL,
            satietytext TEXT,
            energyscore INTEGER NOT NULL,
            energytext TEXT,
            wellbeingscore INTEGER NOT NULL,
            wellbeingtext TEXT,
            carbsscore INTEGER NOT NULL,
            carbstext TEXT,
            stressambool INTEGER NOT NULL,
            stresspmbool INTEGER NOT NULL,
            walksbool INTEGER NOT NULL,
            movementbool INTEGER NOT NULL,
            movementtext TEXT,
            bedtimebool INTEGER NOT NULL,
            bedtimetext TEXT,
            userid INTEGER NOT NULL,
            FOREIGN KEY(userid) REFERENCES user(id)
          );
       `);
      });
    }
    catch (err) { console.error(err); }
    finally {
      db.close();
    }
  }
}

// Uncomment to reset database.
// DB.setupDatabase();
