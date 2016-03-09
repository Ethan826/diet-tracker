/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import * as crypto from "crypto";
import {Promise} from "es6-promise";
import {ICredentials} from "./interfaces";

let HASHING_CONSTANTS = {
  HASH_LENGTH: 128,
  ITERATIONS: 50000,
  KEYLEN: 512,
  DIGEST: "sha512",
}

export class Credentials {
  private static HASHING_CONSTANTS = HASHING_CONSTANTS;

  static hashNewCredentials(username: string, password: string) {
    let salt = this.makeSalt();
    return this.pbkdf2(username, password, salt);
  }

  static getHashedPassword(username: string, password: string, salt: string) {
    return this.pbkdf2(username, password, salt);
  }

  private static pbkdf2(username: string, password: string, salt: string): Promise<ICredentials> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.HASHING_CONSTANTS.ITERATIONS,
        this.HASHING_CONSTANTS.KEYLEN,
        this.HASHING_CONSTANTS.DIGEST,
        (err, key) => {
          if (err) reject(err);
          else resolve({
            username: username,
            password: password,
            salt: salt,
            hash: key.toString("Hex")
          });
        }
        )
    });
  }

  private static makeSalt(): string {
    return crypto.randomBytes(this.HASHING_CONSTANTS.HASH_LENGTH).toString("hex");
  }
}
