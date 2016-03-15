import {Injectable, OnInit, EventEmitter} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import * as Rx from "rxjs/Rx";
import {appInjector} from './app-injector';
import {Router, ComponentInstruction} from 'angular2/router';
import {LoginService} from "./login.service";

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
  currentAudience: string;
  audienceEvent: EventEmitter<string>;

  constructor(private http: Http, private loginService: LoginService) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt"
    this.doCheckJWT();
    this.audienceEvent = new EventEmitter();
    this.audienceEvent.subscribe((audience: string) => this.currentAudience = audience);
  }

  doCheckJWT() {
    let jwt = this.checkJWT();
    jwt.subscribe(audience => {
      this.loginService.loginEvent.emit(audience);
    });
  }

  submitNewCreds(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
  }

  submitLogin(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.LOGIN_URL);
  }

  isAuthorized(permittedAudiences: string[]) {
    return permittedAudiences.indexOf(this.currentAudience) >= 0;
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
    this.doCheckJWT();
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
