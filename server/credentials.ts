import * as crypto from "crypto";
import {Promise} from "es6-promise";

interface ICredentials {
  username: string;
  password: string;
  salt: string;
}

export class Credentials {
  private static HASH_LENGTH = 128;
  private static ITERATIONS = 50000;
  private static KEYLEN = 512;
  private static DIGEST = "sha512";

  // static hashNewCredentials(username: string, password: string): Promise<ICredentials> {
  //   let salt = this.makeSalt();
  //   return new Promise((resolve, reject) => {
  //     resolve()
  //   });
  // }

  static getHashedPassword(password: string, salt: string) {
    crypto
  }

  private static passwordHelper(password: string, salt: string) {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.ITERATIONS,
        this.KEYLEN,
        this.DIGEST,
        (err, key) => {
          if (err) {
            reject(err);
          } else {
            resolve(key.toString("hex"));
          }
        });
    });
  }

  private static makeSalt(): string {
    return crypto.randomBytes(this.HASH_LENGTH).toString("hex");
  }
}

Credentials.hashNewPassword("Happy")
  .then((key) => { console.log(key) })
  .catch((err) => { console.log(err) });
