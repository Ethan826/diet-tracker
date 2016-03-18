import {Injectable, OnInit, EventEmitter} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import * as Rx from "rxjs/Rx";
import {appInjector} from "./app-injector";
import {Router, ComponentInstruction} from "angular2/router";
import {LoginService} from "./login.service";

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_CREDS_URL = "app/submitcreds";
let LOGIN_URL = "app/dologin";

@Injectable()
export class AccountService {
  private HEADERS: Headers;
  private SUBMIT_CREDS_URL: string;
  private LOGIN_URL: string;
  private JWT_CHECK_URL: string;

  constructor(private http: Http, private loginService: LoginService) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
    this.LOGIN_URL = "app/dologin";
    this.JWT_CHECK_URL = "app/checkjwt";
    this.doCheckJWT();
  }

  doCheckJWT() {
    let jwt = this.checkJWT();
    jwt.subscribe(jwt => {
      this.loginService.loginEvent.emit(jwt);
    });
  }

  submitNewCreds(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.SUBMIT_CREDS_URL);
  }

  submitLogin(username: string, password: string): Rx.Observable<Response> {
    return this.submitHelper(username, password, this.LOGIN_URL);
  }

  private checkJWT(): Rx.Observable<Object> {
    return this.http.post(
      this.JWT_CHECK_URL,
      JSON.stringify({ jwt: localStorage.getItem("jwt") }),
      { headers: this.HEADERS }
      )
      .map((res: Response) => res.json());
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
    let creds = JSON.stringify({ username: username, password: password });
    return this.http.post(url, creds, { headers: this.HEADERS });
  }
}
