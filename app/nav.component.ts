import {Component} from "angular2/core";
import {NgClass} from "angular2/common";
import {ROUTER_DIRECTIVES} from "angular2/router";

interface NavOption {
  text: string;
  route: string;
}

let NAV_OPTIONS: NavOption[] = [
  { text: "Daily Tracker", route: "/DailyForm" },
  { text: "Monthly View", route: "/MonthlyForm" },
  { text: "Login", route: "/Login" },
  { text: "New User", route: "/CreateUser" },
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
            <li *ngFor="#navOption of navOptions">
              <a [routerLink]="[navOption.route]">{{navOption.text}}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  private navOptions: NavOption[];
  constructor() {
    this.navOptions = NAV_OPTIONS;
  }
}
