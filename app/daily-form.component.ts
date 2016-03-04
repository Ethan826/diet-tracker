import {Component} from "angular2/core";
import {IButtonQuestion, IButtonQuestionField, ICheckboxQuestion} from "./interfaces";
import {ButtonQuestions} from "./button-questions.component";
import {CheckboxQuestions} from "./checkbox-questions.component";
import {buttonQuestions, checkboxQuestions} from "./question-data";

@Component({
  selector: "daily-form",
  directives: [ButtonQuestions, CheckboxQuestions],
  template: `
    <h1>Daily Tracker</h1>
    <br>
    <button-questions
      *ngFor="#b of buttonQuestions"
      [btn]="b"
      (onDataEntered)="buttonDataEntered($event)">
    </button-questions>
    <checkbox-questions
      *ngFor="#c of checkboxQuestions"
      [cbox]="c"
      (onDataEntered)="checkboxDataEntered($event)">
    </checkbox-questions>
  `
})
export class DailyForm {
  private buttonQuestions: IButtonQuestionField[];
  private checkboxQuestions: ICheckboxQuestion[];
  private score: number;

  constructor() {
    this.score = 0;
    this.buttonQuestions = buttonQuestions;
    this.checkboxQuestions = checkboxQuestions;
    this.buttonQuestions.forEach((b, i) => {
      b["index"] = i;
    });
    this.checkboxQuestions.forEach((c, i) => {
      c["index"] = i;
    });
  }

  private buttonDataEntered(event: IButtonQuestionField) {
    let i = event["index"];
    this.buttonQuestions[i] = event;
  }

  private checkboxDataEntered(event: ICheckboxQuestion) {
    let i = event["index"];
    this.checkboxQuestions[i] = event;
  }
}
