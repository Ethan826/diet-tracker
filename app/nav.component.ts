import {Component} from "angular2/core";
import {NgClass} from "angular2/common";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AccountService} from "./account.service";
import {Response, HTTP_PROVIDERS} from "angular2/http";

interface NavOption {
  text: string;
  route: string;
  audience: string[]; // These should be refactored to an enum
}

let NAV_OPTIONS: NavOption[] = [
  { text: "Daily Tracker", route: "/DailyForm", audience: ["standard", "admin"] },
  { text: "Monthly View", route: "/MonthlyForm", audience: ["standard", "admin"]},
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
            <li *ngFor="#navOption of navOptions">
              <a [routerLink]="[navOption.route]">{{navOption.text}}</a>
            </li>
            <li><a (click)="logout()" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  private navOptions: NavOption[];

  constructor(private accountService: AccountService, private router: Router) {
    this.navOptions = NAV_OPTIONS;
  }

  logout() {
    localStorage.removeItem("jwt");
    this.router.navigate["/Login"];
  }
}
