import {Subscription} from "rxjs/Subscription";
import {Component, Injector} from "angular2/core";
import {NgClass} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AccountService, checkAuth} from "./account.service";
import {Response, HTTP_PROVIDERS} from "angular2/http";
import {appInjector} from "./app-injector";
import {Observable} from "rxjs/Observable";

interface NavOption {
  text: string;
  route: string;
  audience: string[]; // These should be refactored to an enum
}

let NAV_OPTIONS: NavOption[] = [
  { text: "Daily Tracker", route: "/DailyForm", audience: ["standard", "admin"] },
  { text: "Monthly View", route: "/MonthlyForm", audience: ["standard", "admin"] },
  { text: "Login", route: "/Login", audience: ["any"] },
  { text: "New User", route: "/CreateUser", audience: ["any"] },
];

@Component({
  selector: "nav-component",
  directives: [NgClass, ROUTER_DIRECTIVES],
  providers: [AccountService, HTTP_PROVIDERS],
  template: `
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Diet Tracker</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
          <li *ngIf="hasPermission('standard') || hasPermission('admin') | async">
            Foo
          </li>
            <li>
              <a [routerLink]="['/MonthlyForm']">Monthly</a>
            </li>
            <li><a [routerLink]="['/Login']">Login</a></li>
            <li><a [routerLink]="['/Login']"
                   (click)="accountService.logout()">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  constructor(private accountService: AccountService) { }

  hasPermission(audience: string): Observable<boolean> {
    return this.accountService.audiencePermissions[audience];
  }
}
