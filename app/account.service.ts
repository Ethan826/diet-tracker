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

@Injectable()
export class AccountService {
  private HEADERS: Headers;
  private SUBMIT_CREDS_URL: string;
  private LOGIN_URL: string;
  private JWT_CHECK_URL: string;
  public audience: Observable<string>;
  public audiencesMap: IAudiencesMap;

  constructor(private http: Http) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt"
    this.doCheckJWT();
  }

  doCheckJWT() {
    let jwt = this.checkJWT();
    this.audiencesMap = {
      "standard": jwt.map(audience => { return audience === "standard" }),
      "admin": jwt.map(audience => { return audience === "standard" })
    }
    jwt.map(audience => { return audience === "[]" ? "" : audience });
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

  isAuthorized(audiences: string[]) {
    return new Promise((resolve) => {
      this.audience
        .subscribe((actualAudience: string) => {
        resolve(audiences.indexOf(actualAudience) >= 0);
      });
    });
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
