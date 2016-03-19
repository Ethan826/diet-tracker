import {Injectable, OnInit, EventEmitter} from "angular2/core";
import {appInjector} from "./app-injector";
import {AccountService} from "./account.service";
import {LoginService} from "./login.service";
import {IJWT} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Router, ComponentInstruction} from "angular2/router";

let HEADERS = new Headers({ "Content-Type": "application/json" });
let SUBMIT_DAILY_URL = "app/submitdaily";

@Injectable()
export class FormsService {
  private HEADERS: Headers;
  private SUBMIT_DAILY_URL: string;
  private jwtResult: IJWT;

  constructor(
    private http: Http,
    private accountService: AccountService,
    private loginService: LoginService
    ) {
    this.HEADERS = HEADERS;
    this.SUBMIT_DAILY_URL = SUBMIT_DAILY_URL;
    if (!(this.jwtResult && this.jwtResult.userId)) {
      this.loginService.loginEvent.subscribe((j: IJWT) => this.jwtResult = j);
      this.accountService.doCheckJWT();
    }
  }

  submitDaily(formOutput: Object): Promise<any> { // TODO: Change type
    let result = new Promise((resolve, reject) => {
      console.log(this.jwtResult);
      formOutput["userId"] = this.jwtResult.userId;
      console.log(JSON.stringify(formOutput));
      console.log("Submitting form in forms.service.ts");
      this.http.post(
        this.SUBMIT_DAILY_URL,
        JSON.stringify(formOutput),
        { headers: this.HEADERS }
        ).subscribe(res => console.log(res), err => console.log(err));
    });
    return result;
  }
}
