import {Injectable, OnInit} from "angular2/core";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Observable} from "rxjs/Observable";

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_CREDS_URL = "app/submitcreds";
let LOGIN_URL = "app/dologin";

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

  private submitHelper(
    username: string,
    password: string,
    url: string
    ): Observable<Response> {
    let creds = JSON.stringify({ username: username, password: password })
    return this.http.post(url, creds, { headers: this.HEADERS });
  }
}
