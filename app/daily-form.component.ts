/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Component, Injector} from "angular2/core";
import {IButtonQuestion, IButtonQuestionField, ICheckboxQuestion} from "./interfaces";
import {DatePicker} from "./date-picker.component";
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
  directives: [DatePicker],
  providers: [HTTP_PROVIDERS],
  templateUrl: "app/daily-form.template.html"
})
export class DailyForm {
  private date: Date;
  private buttonQuestions: IButtonQuestionField[];
  private checkboxQuestions: ICheckboxQuestion[];
  private score: number;

  // This hacky implementation appears to be necessary because of an issue
  // binding controls when composing a form out of sub-elements
  // https://github.com/angular/angular/issues/6855. Or at least I can't
  // figure out how to do it.

  // TODO: fix this when composing elements into a single form is working
  // properly / more straightforwardly / without DI issues

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
