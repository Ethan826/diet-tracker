import {Component} from "angular2/core";
import {IButton, IButtonField} from "./interfaces";
import {ButtonField} from "./button-field.component";
import {buttonForms} from "./button-data";

@Component({
  selector: "daily-form",
  directives: [ButtonField],
  template: `
    <h1>Daily Tracker</h1>
    <br>
    <button-field
      *ngFor="#b of buttonForms"
      [btn]="b">
    </button-field>
  `
})
export class DailyForm {
  buttonForms: IButtonField[];

  constructor() {
    this.buttonForms = buttonForms;
  }
}
