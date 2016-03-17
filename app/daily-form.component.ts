/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Component, Injector} from "angular2/core";
import {ControlGroup, FormBuilder, AbstractControl} from "angular2/common";
import {IButtonQuestion, ICheckboxQuestion} from "./interfaces";
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
  private buttonQuestions: { [key: string]: IButtonQuestion };
  private checkboxQuestions: ICheckboxQuestion[];

  private dailyGroup: ControlGroup;

  // Consider reimplementing with Sweet.js macros to transform
  // the data structure directly into the fb.group() call
  constructor(fb: FormBuilder) {
    this.buttonQuestions = buttonQuestions;
    let hungerControl = this.buttonQuestions["hungerControl"];
    console.log(fb.group(this.fbButtonHelper(hungerControl.buttons)));
  }

  private fbButtonHelper(buttons: { [val: number]: string }) {
    let result = {};
    let keys = Object
      .keys(buttons)
      .filter(button => { return buttons.hasOwnProperty(button) });
    keys.forEach(key => {
      result[String(key)] = [false];
    });
    return result;
  }

  private buttonDataEntered(event: IButtonQuestion) {
    let i = event["index"];
    this.buttonQuestions[i] = event;
  }

  private checkboxDataEntered(event: ICheckboxQuestion) {
    let i = event["index"];
    this.checkboxQuestions[i] = event;
  }
}
