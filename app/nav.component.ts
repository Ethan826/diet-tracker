import {Component} from "angular2/core";
import {NgClass} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

interface NavOption {
  text: string;
  available: boolean;
  active: boolean;
  route: string;
}

export let NAV_OPTIONS: NavOption[] = [
  { text: "Daily Tracker", available: true, active: false, route: "DailyForm" },
  { text: "Monthly View", available: true, active: false, route: "MonthlyForm" },
  { text: "Login", available: true, active: false, route: "Login" },
  { text: "New User", available: true, active: false, route: "CreateUser" },
  { text: "Account Info", available: true, active: false, route: "AccountInfo" },
  { text: "Admin Panel", available: false, active: false, route: "AdminPanel" }
];

@Component({
  selector: "nav-component",
  directives: [NgClass, ROUTER_DIRECTIVES],
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
            <li *ngFor="#navOption of navOptions" [class.active]="navOption.active">
              <a [routerLink]="[navOption.route]" *ngIf="navOption.available" href="#" (click)="handleNavSelection(navOption)">{{navOption.text}}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  private navOptions: NavOption[] = NAV_OPTIONS;

  handleNavSelection(option: NavOption) {
    this.navOptions.forEach((o) => {
      o.active = false;
    });
    option.active = true;
  }
}
