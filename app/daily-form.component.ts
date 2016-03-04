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
      [btn]="b"
      (onDataEntered)="dataEntered($event)">
    </button-field>
  `
})
export class DailyForm {
  private buttonForms: IButtonField[];
  private score: number;

  constructor() {
    this.score = 0;
    this.buttonForms = buttonForms;
    this.buttonForms.forEach((b, i) => {
      b["index"] = i;
    });
  }

  private dataEntered(event: IButtonField) {
    let i = event["index"];
    this.buttonForms[i] = event;
    console.log(this.buttonForms[i]);
  }
}
