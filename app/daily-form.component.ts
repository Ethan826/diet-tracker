/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Component, Injector} from "angular2/core";
import {ControlGroup, FormBuilder, Control, AbstractControl} from "angular2/common";
import {IButtonQuestion, ICheckboxQuestion} from "./interfaces";
import {DatePicker} from "./date-picker.component";
import {buttonQuestions, checkboxQuestions} from "./question-data";
import {AccountService} from "./account.service";
import {CanActivate, ComponentInstruction} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Observable} from "rxjs/Observable";
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
  private testBool: boolean;
  private questionGroup: ControlGroup;
  private testControl: Control;

  private dailyGroup: ControlGroup;

  // Consider reimplementing with Sweet.js macros to transform
  // the data structure directly into the fb.group() call
  constructor(private fb: FormBuilder) {
    this.buttonQuestions = buttonQuestions;
    let buttonGroup = this.buttonGroupBuilder(this.buttonQuestions);
    this.questionGroup = buttonGroup;
    console.log(this.questionGroup);
  }

  private getControl(outer: string, inner: string) {
    return this.questionGroup.controls[outer].controls[inner];
  }

  private identity(i: any) {
    return i;
  }

  private flipFlop(control: Control) {
    control.updateValue(!control.value);
  }

  /**
   * Helper method to convert questions associated with buttons into a
   * ControlGroup of ControlGroups.
   *
   * @param {Object} buttonQuestions - buttonQuestions is an object-based map of
   * the name of each button and the IButtonQuestion.
   *
   * @returns {ControlGroup} - The return value is a ControlGroup containing multiple
   * ControlGroups, each corresponding to a question; each question's
   * ControlGroup contains a Control for one of the buttons.
   */
  private buttonGroupBuilder(
    buttonQuestions: { [key: string]: IButtonQuestion }
    ): ControlGroup {
    // Accumulator of outer ControlGroup
    let finalResult = {};

    // Loop over questions by key to build up outer ControlGroup
    let questionKeys = this.getKeys(buttonQuestions);
    questionKeys.forEach(questionKey => {
      let intermediateResult = {};
      let buttonQuestion = buttonQuestions[questionKey];
      let buttonKeys = this.getKeys(buttonQuestion.buttons);

      // Loop over buttons to build inner ControlGroups
      buttonKeys.forEach(buttonKey => {
        intermediateResult[buttonKey] = [false];
      });
      finalResult[questionKey] = this.fb.group(intermediateResult);
    });
    return this.fb.group(finalResult);
  }

  private getKeys(objects: { [val: number]: any }) {
    return Object
      .keys(objects)
      .filter(object => { return objects.hasOwnProperty(object) });
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
