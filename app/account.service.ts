/// <reference path="../node_modules/rxjs/Subscription.d.ts"/>
import {Injectable, OnInit} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import * as Rx from "rxjs/Rx";
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
  public audience: Rx.Subject<string>;
  public audiencesMap: IAudiencesMap;
  private subscriptions: Rx.Subscription[];
  // public audience: Promise<string>;
  // public audiencesMap: IAudiencesMap;
  // public loggedIn: Observable<boolean>;

  constructor(private http: Http) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt"
    this.audience = new Rx.Subject();
    this.subscriptions = [];
    this.doCheckJWT();
  }

  doCheckJWT() {
    let jwt = this.checkJWT()
      .map((audience: string) => { return audience === "[]" ? "" : audience });

    this.subscriptions.unshift(jwt.subscribe(this.audience));

    while (this.subscriptions.length > 1) {
      this.subscriptions.pop().dispose();
    }
  }

  submitNewCreds(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
  }

  submitLogin(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.LOGIN_URL);
  }

  private checkJWT(): Rx.Observable<string> {
    return this.http.post(
      this.JWT_CHECK_URL,
      JSON.stringify({ jwt: localStorage.getItem("jwt") }),
      { headers: this.HEADERS }
      )
      .map((res: Response) => res.text())
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  private submitHelper(
    username: string,
    password: string,
    url: string
    ): Rx.Observable<Response> {
    let creds = JSON.stringify({ username: username, password: password })
    return this.http.post(url, creds, { headers: this.HEADERS });
  }
}
