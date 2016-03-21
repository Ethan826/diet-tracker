/// <reference path="./typings/main/ambient/sqlite3/index.d.ts"/>
/// <reference path="./typings/main/ambient/node/index.d.ts"/>

import * as sqlite3 from "sqlite3";
import {Database} from "sqlite3";
import {Promise} from "es6-promise";
import * as fs from "fs";
import {Credentials} from "./credentials";
import {ICredentials, IJWT} from "./interfaces";

let DB_PATH = "/home/ethan/db.db";

/**
 * Static methods to manage database.
 */
export class DB {
  static DB_PATH: string;

  /**
   * Given a username, password, and  callback, create a user. The password
   * is not saved.
   */
  static addUser(username: string, password: string, cb: Function): void {
    let db = new Database(DB_PATH);

    Credentials.hashNewCredentials(username, password)
      .then(data => {
      db.run(
        "insert into users (username, salt, hashedpwd) values (?, ?, ?)",
        [data.username, data.salt, data.hash], cb // Null on success, single error parameter on success
        );
      db.close();
    });
  }

  static getEntries(userId: number) {
    return new Promise((resolve, reject) => {
      let db = new Database(DB_PATH);
      return db.all(
        "SELECT * FROM entries WHERE userid = ? ORDER BY date",
        [userId],
        (err, rows) => {
          if (!rows) {
            reject(err);
          } else {
            if (err) { console.error(err); }
            resolve(rows);
          }
        }
        );
    });
  }

  static deleteEntry(entryId: number, actualUserId: number): Promise<{}> {
    let db = new Database(DB_PATH);
    let errors = [];

    // Check that the logged in user is either an admin or the entry owner
    let entry: Promise<{}> = new Promise((rej, res) => {
      db.get(
        "SELECT * FROM entries WHERE id = ? LIMIT 1",
        [entryId],
        (row, err) => {
          if (row) { res(row); }
          else { rej(err); }
        });
    });

    let user: Promise<{}> = new Promise((rej, res) => {
      db.get(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [actualUserId],
        (row, err) => { // node-sqlite3 docs seem wrong re order of params
          if (row) { res(row); }
          else { rej(err); }
        });
    });

    let isAuth: Promise<boolean> = new Promise((res, rej) => {
      user.then(u => {
        entry.then(e => {
          if (u["admin"] || e["userid"] === u["id"]) {
            res(true);
          }
          else { res(false); }
        }).catch(e => errors.push[e]);
      }).catch(e => errors.push[e]);
    });

    return new Promise((res, rej) => {
      isAuth.then(a => {
        if (a) {
          db.run(
            "DELETE FROM entries WHERE id = ?",
            [entryId],
            (err) => {
              if (err) {
                errors.push(err);
                rej(errors);
              } else {
                res();
              }
            });
        }
      });
    });
  }

  /**
   * Given userId, returns a Promise<boolean> of whether the user is an
   * admin.
   */
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

  /**
   * Given a username and password, return a Promise. TODO: refactor weird
   * return type.
   */
  static checkCredentials(
    username: string,
    password: string
    ): Promise<{ success: string, jwt: IJWT }> {
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
            console.error(dbErr);
            reject({ success: false, error: "Username or database error" });
          }
        }
        );
    });
  }

  /**
   * Given the output of a daily form and a callback, insert the results into
   * the database and call the callback with the results (with no arguments
   * passed in on success and an error passed in for an error).
   */
  static handleDailyForm(formOutput: JSON): Promise<{} | void> {
    let db = new Database(DB_PATH);
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT COUNT(*) FROM entries WHERE userid = ? AND date = ?",
        [formOutput["userId"], formOutput["date"]],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            if (rows["COUNT(*)"] > 0) {
              reject({ "error": `You have already entered data for ${formOutput["date"]}` });
            } else {
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
                (err) => {
                  db.close();
                  if (err) {
                    reject(err);
                  } else {
                    resolve();
                  }
                });
            }
          }
        });
    });
  }

  /**
   * @internal  Identical to method used elsewhere. TODO: put in single file.
   */
  private static getKeys(objects: { [val: string]: any }) {
    return Object
      .keys(objects)
      .filter(object => { return objects.hasOwnProperty(object); });
  }

  /**
   * Caution: resets database.
   */
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
