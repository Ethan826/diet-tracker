import {Injectable, EventEmitter} from "angular2/core";
import {appInjector} from "./app-injector";
import {AccountService} from "./account.service";
import {IJWT} from "./interfaces";
import {Observable} from "rxjs/Observable";

export const checkAuth = (permittedAudiences: string[]): Promise<boolean> => {
  let injector = appInjector();
  let loginService = injector.get(LoginService);
  return loginService.isAuthorized(permittedAudiences);
};

export const checkLoggedOut = (): Promise<boolean> => {
  let injector = appInjector();
  let loginService = injector.get(LoginService);
  return new Promise((resolve, reject) => {
    loginService.loggedOut.subscribe(
      (loggedOut: boolean) => { resolve(loggedOut); },
      (err: any) => { reject(err); }
      );
  });
};

@Injectable()
export class LoginService {
  loginEvent: EventEmitter<Object>;
  loggedIn: Observable<boolean>;
  loggedOut: Observable<boolean>;
  jwtResult: IJWT;

  constructor() {
    this.loginEvent = new EventEmitter();

    // If I implement revocation of JWTs from the server side, make sure to
    // cache JWTs that are revoked until they expire.
    this.loginEvent.subscribe((jwtResult: IJWT) => {
      this.jwtResult = jwtResult;
    });
    this.loggedIn = this.loginEvent
      .map((jwtResult: IJWT) => {
      return Boolean(jwtResult && jwtResult.aud);
    });
    // Necessary because you can't negate an Observable<boolean> or assign
    // within a map function inside a template
    this.loggedOut = this.loggedIn.map(b => !b);
  }

  isAuthorized(permittedAudiences: string[]): Promise<boolean> {
    // A jwtResult is at the ready
    if (this.jwtResult) {
      return Promise.resolve(
        permittedAudiences.indexOf(this.jwtResult.aud) >= 0
        );
    } else {
      // There is a jwt but jwtResult is not in yet. Subscribe to the event
      // emitter and wait for the result.
      if (localStorage.getItem("jwt")) { // TODO: remove magic constants
        return new Promise((resolve, reject) => {
          this.loginEvent.subscribe(
            (jwtResult: IJWT) => { resolve(jwtResult); },
            (err: any) => { reject(err); }
            );
        });
        // There is no jwt in local storage so the user definitely has no
        // permissions
      } else {
        return Promise.resolve(false);
      }
    }
  }
}
