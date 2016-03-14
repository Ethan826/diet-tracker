import {Injectable, OnInit} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from 'angular2/router';
import {IAudiencesMap} from "./interfaces";

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_CREDS_URL = "app/submitcreds";
let LOGIN_URL = "app/dologin";

export const checkAuth = (permittedAudiences: string[]) => {
  let injector = appInjector();
  let accountService = injector.get(AccountService);
  return accountService.isAuthorized(permittedAudiences);
};

/* We need to have an Observable that IS NOT REPLACED that the *ngIfs in the
 * navComponent can remain subscribed to. They are being replaced, and so the
 * navComponent is not subscribed to the updated observable.
 * The problem is that each JWT check returns a new observable, so that has to
 * be slotted in.
 */

@Injectable()
export class AccountService {
  private HEADERS: Headers;
  private SUBMIT_CREDS_URL: string;
  private LOGIN_URL: string;
  private JWT_CHECK_URL: string;
  public audience: Promise<string>;
  public audiencesMap: IAudiencesMap;
  public loggedIn: Observable<boolean>;

  constructor(private http: Http) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt"
    this.doCheckJWT();
  }

  doCheckJWT() {
    let jwt = this.checkJWT();
    // This is for hiding links in nav.component: an Observable
    this.audiencesMap = {
      "standard": jwt.map(audience => { return audience === "standard"; }),
      "admin": jwt.map(audience => { return audience === "admin"; })
    }
    // This is for @CanActivate, which requires a promise
    this.audience = new Promise((resolve, reject) => {
      jwt.subscribe(
        (audience) => { resolve(audience); },
        (err) => { reject(err); }
        );
    });
    // This is for hiding / showing the Login and Logout links
    this.loggedIn = jwt.map(audience => { return audience === "[]" || audience === "" });
  }

  submitNewCreds(username: string, password: string): Observable<Response> {
    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
  }

  submitLogin(username: string, password: string): Observable<Response> {
    return this.submitHelper(username, password, this.LOGIN_URL);
  }

  private checkJWT(): Observable<string> {
    return this.http.post(
      this.JWT_CHECK_URL,
      JSON.stringify({ jwt: localStorage.getItem("jwt") }),
      { headers: this.HEADERS }
      )
      .map((res: Response) => res.text())
  }

  isAuthorized(audiences: string[]): Promise<boolean> | boolean {
    console.log("In isAuthorized");
    this.doCheckJWT(); // Is this necessary?
    return new Promise((resolve, reject) => {
      this.audience
        .then((audience) => {
        console.log(`Inside the promise inside isAuthorized, audience = ${audience}`);
        resolve(
          audiences.indexOf(audience) >= 0
          )
      })
        .catch(err => reject(err));
    });
  }

  logout() {
    localStorage.removeItem("jwt");
    this.audience = Promise.resolve("");
    this.audiencesMap = {};
  }

  private submitHelper(
    username: string,
    password: string,
    url: string
    ): Observable<Response> {
    let creds = JSON.stringify({ username: username, password: password })
    return this.http.post(url, creds, { headers: this.HEADERS });
  }
}
