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
  private checkboxQuestions: { [key: string]: ICheckboxQuestion };
  private testBool: boolean;
  private buttonGroup: ControlGroup;
  private checkboxGroup: ControlGroup;

  private dailyGroup: ControlGroup;

  // Consider reimplementing with Sweet.js macros to transform
  // the data structure directly into the fb.group() call
  constructor(private fb: FormBuilder) {
    this.buttonQuestions = buttonQuestions;
    this.checkboxQuestions = checkboxQuestions;
    this.dailyGroup = fb.group({
      "buttonGroup": this.buttonGroupBuilder(this.buttonQuestions),
      "checkboxGroup": this.checkboxGroupBuilder(this.checkboxQuestions)
    });
    console.log(this.dailyGroup);
  }

  private handleButtonSelection(outer: string, inner: string) {
    // Hack to suppress type error (temp is a Control)
    let temp: any = this.buttonGroup.controls[outer];

    let controls = temp.controls.buttons.controls;
    for (let c in controls) {
      if (controls.hasOwnProperty(c)) {
        controls[c].updateValue(false);
      }
    }
    controls[inner].updateValue(true);
    controls[inner].markAsTouched();
    controls[inner].markAsDirty();
  }

  handleCheckboxSelection(outer: string) {
    // Hack to suppress type error (temp is a Control)
    let temp: any = this.dailyGroup.controls["checkboxGroup"];
    let control = temp.controls[outer].controls["checkboxPrompt"];
    control.updateValue(!control.value);
    control.markAsTouched();
    control.markAsDirty();
  }

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
      let tertiaryResult = {};
      buttonKeys.forEach(buttonKey => {
        tertiaryResult[buttonKey] = [false];
      });

      // Add the text field
      intermediateResult["buttons"] = this.fb.group(tertiaryResult);
      intermediateResult["textField"] = [""];
      finalResult[questionKey] = this.fb.group(intermediateResult);
    });
    return this.fb.group(finalResult);
  }

  private checkboxGroupBuilder(checkboxQuestions: { [key: string]: ICheckboxQuestion }) {
    let finalResult = {};
    this.getKeys(checkboxQuestions).forEach((outer) => {
      let intermediateResult = {};
      this.getKeys(checkboxQuestions[outer]).forEach((inner) => {
        // TODO: Refactor to avoid matching the string
        if (inner === "textPrompt") {
          intermediateResult[inner] = [""];
        } else {
          intermediateResult[inner] = [false];
        }
      });
      finalResult[outer] = this.fb.group(intermediateResult);
    });
    return this.fb.group(finalResult);
  }

  private getKeys(objects: { [val: string]: any }) {
    return Object
      .keys(objects)
      .filter(object => { return objects.hasOwnProperty(object); });
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
