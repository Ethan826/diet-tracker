import {Injectable, EventEmitter} from "angular2/core";
import {appInjector} from "./app-injector";
import {AccountService} from "./account.service";

export const checkAuth = (permittedAudiences: string[]) => {
  let injector = appInjector();
  let loginService = injector.get(LoginService);
  return loginService.isAuthorized(permittedAudiences);
};

@Injectable()
export class LoginService {
  loginEvent: EventEmitter<string>;
  audience: string;

  constructor() {
    this.loginEvent = new EventEmitter();
    this.loginEvent.subscribe((audience: string) => this.audience = audience);
  }

  isAuthorized(permittedAudiences: string[]): boolean {
    if (this.audience) {
      return permittedAudiences.indexOf(this.audience) >= 0;
    } else {
      return false;
    }
  }
}
