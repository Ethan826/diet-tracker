/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Component, Injector} from "angular2/core";
import {IButtonQuestion, IButtonQuestionField, ICheckboxQuestion} from "./interfaces";
import {DatePicker} from "./date-picker.component";
import {ButtonQuestions} from "./button-questions.component";
import {CheckboxQuestions} from "./checkbox-questions.component";
import {buttonQuestions, checkboxQuestions} from "./question-data";
import {AccountService} from "./account.service";
import {CanActivate, ComponentInstruction} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {checkAuth} from "./login.service";

@CanActivate((to: ComponentInstruction, fr: ComponentInstruction) => {
  return checkAuth(["standard", "admin"]);
})
@Component({
  selector: "daily-form",
  directives: [ButtonQuestions, CheckboxQuestions, DatePicker],
  providers: [HTTP_PROVIDERS],
  template: `
    <form>
      <h1>Daily Tracker</h1>
      <br>
      <legend>Date</legend>
      <date-picker (onDataEntered)="dateDataEntered($event)"></date-picker>
      <br>
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
      <br>
      <input type="submit" value="Submit" class="btn btn-primary">
    </form>
  `
})
export class DailyForm {
  private date: Date;
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

  private dateDataEntered(event: Date) {
    console.log(event);
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
