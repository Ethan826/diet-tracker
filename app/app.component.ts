import {Component, Injectable} from "angular2/core";
import {DailyForm} from "./daily-form.component";
import {MonthlyForm} from "./monthly-form.component";
import {Login} from "./login.component";
import {CreateUser} from "./create-user.component";
import {AdminComponent} from "./admin.component";
import {AccountService} from "./account.service";
import {NavComponent} from "./nav.component";
import {Entries} from "./entries.component";
import {FrontComponent} from "./front.component";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "angular2/router";

/**
 * Main app component. Sets the overall template, establishes routing.
 */
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
  { path: "/", redirectTo: ["/diet"] },
  { path: "/diet/", name: "FrontComponent", component: FrontComponent },
  { path: "/diet/daily", name: "DailyForm", component: DailyForm },
  { path: "/diet/monthly", name: "MonthlyForm", component: MonthlyForm },
  { path: "/diet/admin", name: "Admin", component: AdminComponent },
  { path: "/diet/login", name: "Login", component: Login },
  { path: "/diet/entries", name: "Entries", component: Entries },
  { path: "/diet/createuser", name: "CreateUser", component: CreateUser }
])
export class AppComponent {
  constructor(public accountService: AccountService) { }
}
