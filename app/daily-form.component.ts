/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {Component, Injector, OnInit} from "angular2/core";
import {
ControlGroup,
FormBuilder,
Control,
AbstractControl,
Validators
} from "angular2/common";
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
  template: `
  <!-- Header material -->
  <h1>Daily Tracker</h1>
  <br>

  <form [ngFormModel]="dailyGroup">

    <!-- Date -->
    <legend>Date</legend>

    <input type="text"
           [ngFormControl]="dailyGroup.controls['date']"
           readonly="readonly"
           id="date-picker">
    <br><br>

    <!-- Button Questions -->

    <div *ngFor="#outer of getKeys(buttonQuestions)">
      <legend>{{buttonQuestions[outer].legend}}</legend>
      <label>{{buttonQuestions[outer].explanatoryText}}</label>
      <br>
      <div class="btn-group" data-toggle="buttons">
        <label *ngFor="#inner of getKeys(buttonQuestions[outer].buttons)"
               class="btn btn-default"
               [class.error]="submitAttempted | async"
               (click)="handleButtonSelection(outer, inner)">
          <input type="radio"
                 name="{{outer}}">
            {{buttonQuestions[outer].buttons[inner]}}
        </label>
      </div>
      <br>
      <br>
      <div class="form-group">
        <!-- This is getting a little hairy. Consider refactoring. -->
        <input [ngFormControl]="dailyGroup.controls.buttonGroup.controls[outer].controls['textField']"
               placeholder="{{buttonQuestions[outer].placeholderText}}"
               class="form-control"
               type="text">
      </div>
      <br>
    </div>

    <!-- Checkbox Questions -->

    <div *ngFor="#outer of getKeys(checkboxQuestions)">
      <label>
        <input type="checkbox"
               (click)="handleCheckboxSelection(outer)">
          &emsp; {{checkboxQuestions[outer]["checkboxPrompt"]}}
      </label>
      <div *ngIf="checkShowText(outer)">
        <div class="form-group">
          <input [ngFormControl]="dailyGroup.controls.checkboxGroup.controls[outer].controls['textPrompt']"
                 placeholder="{{checkboxQuestions[outer].textPrompt}}"
                 class="form-control"
                 type="text">
      </div>
      </div>
    </div>
    <br>

    <!-- Form Submit -->

    <button type="submit"
            class="btn btn-primary"
            (click)=submitForm()
            [class.disabled]="!dailyGroup.valid">Submit</button>
  </form>
  `
})
export class DailyForm implements OnInit {
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
    let dateString = new Date().toLocaleDateString();
    this.dailyGroup = fb.group({

      // This is a tradeoff: this permits validation, but does so at the cost
      // of switching from date to string to date.
      "date": [dateString, Validators.required],

      "buttonGroup": this.buttonGroupBuilder(this.buttonQuestions),
      "checkboxGroup": this.checkboxGroupBuilder(this.checkboxQuestions)
    });
  }

  /**********************************************
   * Event handlers and submits                 *
   *********************************************/

  ngOnInit() {
    let self = this;
    $("#date-picker").val();
    $("#date-picker").datepicker({
      onSelect: function() {
        // handle the date
      }
    });
  }

  private handleButtonSelection(outer: string, inner: string) {
    // Hack to suppress type error (temp is a Control)
    let temp: any = this.dailyGroup.controls["buttonGroup"];
    let controls: any = temp.controls[outer].controls["buttons"].controls;

    for (let c in controls) {
      if (controls.hasOwnProperty(c)) {
        controls[c].updateValue(false);
      }
    }
    controls[inner].updateValue(true);
    controls[inner].markAsTouched();
    controls[inner].markAsDirty();
  }

  private handleCheckboxSelection(outer: string) {
    // Hack to suppress type error (temp is a Control)
    let temp: any = this.dailyGroup.controls["checkboxGroup"];
    let control = temp.controls[outer].controls["checkboxPrompt"];
    control.updateValue(!control.value);
    control.markAsTouched();
    control.markAsDirty();
  }

  private submitForm() {
    if (!this.dailyGroup.valid) {
      alert("You must click on at least one button in each set.");
    } else {
      console.log(this.dailyGroup);
    }
  }

  /**********************************************
   * Set up form                                *
   *********************************************/

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
      intermediateResult["buttons"] = this.fb.group(
        tertiaryResult,
        { validator: this.oneControlIsChecked }
        );
      intermediateResult["textField"] = [""];
      finalResult[questionKey] = this.fb.group(intermediateResult);
    });
    return this.fb.group(finalResult);
  }

  private checkboxGroupBuilder(
    checkboxQuestions: { [key: string]: ICheckboxQuestion }
    ) {
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

  /**********************************************
   * Validators and helpers                     *
   *********************************************/

  // Validator
  private oneControlIsChecked(group: ControlGroup) {
    let counter = 0;
    for (let key in group.controls) {
      if (group.controls.hasOwnProperty(key)) {
        counter += group.controls[key].value ? 1 : 0;
      }
    }
    if (counter === 1) {
      return null;
    } else {
      return { "mustSelectExactlyOneButton": true };
    };
  }

  private getKeys(objects: { [val: string]: any }) {
    return Object
      .keys(objects)
      .filter(object => { return objects.hasOwnProperty(object); });
  }

  private checkShowText(outer: string) {
    let temp: any = this.dailyGroup.controls["checkboxGroup"];
    let control = temp.controls[outer].controls["checkboxPrompt"];
    return Boolean(
      control.value && temp.controls[outer].controls["textPrompt"]
      );
  }
}
