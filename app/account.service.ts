import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import {Observable} from "rxjs/Observable";

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_CREDS_URL = "app/submitcreds"

@Injectable()
export class AccountService {
  private HEADERS: Headers;
  private SUBMIT_CREDS_URL: string;

  constructor(private http: Http) {
    this.HEADERS = HEADERS;
    this.SUBMIT_CREDS_URL = SUBMIT_CREDS_URL;
  }

  submitNewCreds(username: string, password: string) {
    console.log("Inside the submitNewCreds() method in account.service.ts")
    let creds = JSON.stringify({ username: username, password: password })
    let headers = new Headers({ "Content-Type": "application/json" });
    return this.http.post(this.SUBMIT_CREDS_URL, creds, { headers: this.HEADERS });
  }
}
