import {Injectable, OnInit} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";
/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from 'angular2/router';

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_CREDS_URL = "app/submitcreds";
let LOGIN_URL = "app/dologin";

export const checkAuth = (permittedAudiences: string[]) => {
  let injector = appInjector();
  let accountService = injector.get(AccountService);

  return accountService.isAuthorized(permittedAudiences);
};

@Injectable()
export class AccountService {
  private HEADERS: Headers;
  private SUBMIT_CREDS_URL: string;
  private LOGIN_URL: string;
  private JWT_CHECK_URL: string;
  public audience: Observable<string[]>;
  public currentAudience: string[];

  constructor(private http: Http) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt"
    this.checkJWT();
    this.audience.subscribe(
      result => {
        this.currentAudience = result;
      },
      error => console.error(error)
      );
  }

  submitNewCreds(username: string, password: string): Observable<Response> {
    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
  }

  submitLogin(username: string, password: string): Observable<Response> {
    return this.submitHelper(username, password, this.LOGIN_URL);
  }

  checkJWT() {
    this.audience = this.http.post(
      this.JWT_CHECK_URL,
      JSON.stringify({ jwt: localStorage.getItem("jwt") }),
      { headers: this.HEADERS }
      )
      .map((res: Response) => res.json())
  }

  isAuthorized(audiences: string[]) {
    return new Promise((resolve) => {
      this.audience
        .subscribe((actualAudiences: string[]) => {
        resolve(this.isAuthorizedHelper(audiences, actualAudiences));
      });
    });
  }

  private isAuthorizedHelper(permittedAudiences: string[], actualAudiences: string[]): boolean {
    let result = false;
    if (permittedAudiences.indexOf("any") >= 0) {
      result = true;
    } else {
      permittedAudiences.forEach((audience) => {
        if (actualAudiences.indexOf(audience) >= 0) {
          result = true;
        }
      });
    }
    return result;
  };

  private submitHelper(
    username: string,
    password: string,
    url: string
    ): Observable<Response> {
    let creds = JSON.stringify({ username: username, password: password })
    return this.http.post(url, creds, { headers: this.HEADERS });
  }
}
