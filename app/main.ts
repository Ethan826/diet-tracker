import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from "angular2/router";
import {AppComponent} from "./app.component";
import {provide, ComponentRef} from "angular2/core";
import {appInjector} from "./app-injector";
import {bootstrap} from "angular2/platform/browser";
import {AccountService} from "./account.service";
import {LoginService} from "./login.service";
import "rxjs/Rx";

bootstrap(AppComponent, [
  AccountService,
  LoginService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
]).then((appRef: ComponentRef) => {
  appInjector(appRef.injector);
});
