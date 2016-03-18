/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
/// <reference path="./typings/main/ambient/jwt-simple/index.d.ts"/>
import * as crypto from "crypto";
import {Promise} from "es6-promise";
import {ICredentials, IJWT} from "./interfaces";
import {DB} from "./db";
import * as jwt from "jwt-simple";

let CREDENTIAL_CONSTANTS = {
  HASH_LENGTH: 128,
  ITERATIONS: 50000,
  KEYLEN: 512,
  DIGEST: "sha512",
  JWT_DURATION: 86400,
  SECRET: "Db4gG8tdLXlkvfetHAnkizXn72OulTj68BN1AbXxuKEZrxQexa0aApzPcNH0OvwFMK75ASTKDKpRUNupQjoW3r+rcyPeNf/jJ8nCnWU+033WfBwocMyL5preLR7XGbCIRjeSDrMENixyEYn5GmKqhBBzxkOmp6BBijfmLmDQyCc=",
  ISS: "https://flashbangsplat.com"
};

export class Credentials {
  private static CREDENTIAL_CONSTANTS = CREDENTIAL_CONSTANTS;

  static hashNewCredentials(username: string, password: string) {
    let salt = this.makeSalt();
    return this.pbkdf2(username, password, salt);
  }

  static getHashedPassword(username: string, password: string, salt: string) {
    return this.pbkdf2(username, password, salt);
  }

  static makeJWT(username: string, userId: number, admin: number) {
    let now = Date.now() / 1000;
    let aud = admin === 1 ? "admin" : "standard";
    return jwt.encode({
      iss: CREDENTIAL_CONSTANTS.ISS,
      iat: now,
      aud: aud,
      exp: now + CREDENTIAL_CONSTANTS.JWT_DURATION,
      userId: userId,
      username: username
    } as IJWT, CREDENTIAL_CONSTANTS.SECRET);
  }

  static checkJWT(myJwt: string): Object {
    if (myJwt) {
      let creds = jwt.decode(myJwt, CREDENTIAL_CONSTANTS.SECRET);
      if (Date.now() / 1000 < creds.exp && creds.iss === CREDENTIAL_CONSTANTS.ISS) { // TODO: check database for changes
        return creds;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  private static pbkdf2(username: string, password: string, salt: string): Promise<ICredentials> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.CREDENTIAL_CONSTANTS.ITERATIONS,
        this.CREDENTIAL_CONSTANTS.KEYLEN,
        this.CREDENTIAL_CONSTANTS.DIGEST,
        (err, key) => {
          if (err) reject(err);
          else resolve({
            username: username,
            password: password,
            salt: salt,
            hash: key.toString("base64")
          });
        }
        );
    });
  }

  private static makeSalt(): string {
    return crypto.randomBytes(this.CREDENTIAL_CONSTANTS.HASH_LENGTH).toString("base64");
  }
}
