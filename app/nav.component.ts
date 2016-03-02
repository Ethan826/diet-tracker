import {Component} from "angular2/core";
import {NgClass} from "angular2/common";

interface NavOption {
  text: string;
  available: boolean;
  active: boolean;
}

let NAV_OPTIONS: NavOption[] = [
  {text: "Daily Tracker", available: true, active:  false},
  {text: "Monthly View", available: true, active: false},
  {text: "Account Info", available: true, active: false}
]

@Component({
  selector: "nav-component",
  templateUrl: "app/nav.component.html",
  directives: [NgClass]
})
export class NavComponent {
  private navOptions: NavOption[] = NAV_OPTIONS;

  handleNavSelection(option: NavOption) {
    this.navOptions.forEach((o) => {
      o.active = false;
    });
    option.active = true;
    this.navOptions.forEach((o) => {
      console.log(`${o.text} is ${o.active}`);
    })
  }
}
