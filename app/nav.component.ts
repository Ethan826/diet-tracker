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
  {text: "Daily Tracker", available: true, active:  false, route: "DailyForm"},
  {text: "Monthly View", available: true, active: false, route: "MonthlyForm"},
  {text: "Account Info", available: true, active: false, route: "AccountInfo"},
  {text: "Admin Panel", available: false, active: false, route: "AdminPanel"}
];

@Component({
  selector: "nav-component",
  templateUrl: "app/nav.component.html",
  directives: [NgClass, ROUTER_DIRECTIVES]
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
