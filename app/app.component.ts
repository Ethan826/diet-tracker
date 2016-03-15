import {Component, Injectable} from "angular2/core";
import {DailyForm} from "./daily-form.component";
import {MonthlyForm} from "./monthly-form.component";
import {Login} from "./login.component";
import {CreateUser} from "./create-user.component";
import {AccountInfo} from "./account-info.component";
import {AccountService} from "./account.service";
import {NavComponent} from "./nav.component";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

@Injectable()
@Component({
  selector: "app",
  directives: [NavComponent, DailyForm, MonthlyForm, ROUTER_DIRECTIVES, CreateUser],
  providers: [ROUTER_PROVIDERS, AccountService],
  template: `
    <nav-component></nav-component>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  { path: "/diet/daily", name: "DailyForm", component: DailyForm },
  { path: "/diet/monthly", name: "MonthlyForm", component: MonthlyForm },
  { path: "/diet/account", name: "AccountInfo", component: AccountInfo },
  { path: "/diet/login", name: "Login", component: Login },
  { path: "/diet/createuser", name: "CreateUser", component: CreateUser }
])
export class AppComponent {
  constructor(public accountService: AccountService) { }
}
