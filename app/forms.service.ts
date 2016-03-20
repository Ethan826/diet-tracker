import {Injectable, OnInit, EventEmitter} from "angular2/core";
import {appInjector} from "./app-injector";
import {AccountService} from "./account.service";
import {LoginService} from "./login.service";
import {IJWT} from "./interfaces";
import {Observable} from "rxjs/Observable";
import {Http, Headers, RequestOptionsArgs, Request, Response, RequestMethod} from "angular2/http";
import {Router, ComponentInstruction} from "angular2/router";

let SUBMIT_DAILY_URL = "app/submitdaily";
let ENTRIES_URL = "app/entries";

/**
 * Service to facilitate submitting and retrieving form data from the server.
 */
@Injectable()
export class FormsService {
  private SUBMIT_DAILY_URL: string;
  private ENTRIES_URL: string;

  constructor(
    private http: Http,
    private accountService: AccountService,
    private loginService: LoginService
    ) {
    this.SUBMIT_DAILY_URL = SUBMIT_DAILY_URL;
    this.ENTRIES_URL = ENTRIES_URL;
  }

  /**
   * Submits the output of the DailyForm to the server, returns response.
   */
  submitDaily(formOutput: Object): Promise<JSON> {
    return this.httpHelper(
      this.SUBMIT_DAILY_URL,
      formOutput,
      (jwt: IJWT, request: Object) => {
        request["userId"] = jwt.userId;
        return request;
      },
      RequestMethod.Post
      );
  }

  /**
   * Retrieves the entries associated with the logged in user.
   */
  getUserEntries(): Promise<JSON> {
    return this.httpHelper(
      this.ENTRIES_URL,
      {},
      (jwt: IJWT, request: Object) => {
        request["userId"] = jwt.userId;
        return request;
      },
      RequestMethod.Get
      );
  }

  deleteEntry(id: number): Promise<JSON> {
    return this.httpHelper(
      this.ENTRIES_URL,
      { entryid: id },
      (jwt: IJWT, request: Object) => {
        request["userId"] = jwt.userId;
        return request;
      },
      RequestMethod.Delete
      );
  }

  /**
   * @internal  Accepts a url, the request body, and a callback that executes
   *            once the JWT is updated and in scope. The callback takes a
   *            JWT and a request.
   */
  private httpHelper(
    url: string,
    paramsOrBody: Object,
    codeThatNeedsJWT: (jwt: IJWT, req: any) => Object,
    method: RequestMethod
    ): Promise<JSON> {
    let result = new Promise((resolve, reject) => {
      let handle = this.loginService.loginEvent.subscribe((jwt: IJWT) => {
        let requestOptions: RequestOptionsArgs = {};
        requestOptions.method = method;
        if (method === RequestMethod.Post) {
          requestOptions.headers = new Headers({ "Content-Type": "application/json" });
          requestOptions.body = JSON.stringify(codeThatNeedsJWT(jwt, paramsOrBody));
        } else {
          let headers = codeThatNeedsJWT(jwt, paramsOrBody);
          requestOptions.headers = new Headers(headers);
        }
        console.log(url);
        this.http.request(url, requestOptions)
          .map((r: Response) => r.json())
          .subscribe((r: Response) => resolve(r), (err: any) => resolve(err));
        handle.unsubscribe();
      });
    });
    this.accountService.doCheckJWT();
    return result;
  }
}
