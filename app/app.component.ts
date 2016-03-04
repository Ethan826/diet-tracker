import {Component} from "angular2/core";
import {DailyForm} from "./daily-form.component";
import {MonthlyForm} from "./monthly-form.component";
import {Login} from "./login.component";
import {AccountInfo} from "./account-info.component";
import {ButtonField} from "./button-field.component";
import {NavComponent, NAV_OPTIONS} from "./nav.component";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

@Component({
  selector: "app",
  inputs: [],
  directives: [NavComponent, DailyForm, MonthlyForm, ButtonField, ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS],
  template: `<nav-component></nav-component><router-outlet></router-outlet>`
})
@RouteConfig([
  { path: "/diet/daily", name: "ButtonField", component: ButtonField },
  { path: "/diet/monthly", name: "MonthlyForm", component: MonthlyForm },
  { path: "/diet/account", name: "AccountInfo", component: AccountInfo },
  { path: "/diet/login", name: "Login", component: Login }
])
export class AppComponent { }
