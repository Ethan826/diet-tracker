import {Component, EventEmitter} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control} from "angular2/common";
import {IButtonQuestion, IButtonQuestionField} from "./interfaces";

@Component({
  selector: "button-questions",
  directives: [FORM_DIRECTIVES],
  inputs: ["btn"],
  outputs: ["onDataEntered"],
  template: `
    <div>
      <fieldset>
        <legend>{{btn.legend}}</legend>
        <label>{{btn.explanatoryText}}</label>
        <div class="form-group">
          <div *ngFor="#b of btn.buttons"
               class="btn-group">
            <button type="button"
                    class="btn btn-default"
                    (click)="clicked(b)"
                    [class.btn-primary]="isSelected(b)">
              {{b.buttonText}}
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="sr-only">Subjective Text</label>
          <input class="form-control"
                 type="text"
                 placeholder="{{btn.placeholderText}}"
                 [ngFormControl]="inputTextControl"
                 (keyup)=dataEntered()>
        </div>
      </fieldset>
      <br>
    </div>
  `
})
export class ButtonQuestions {
  onDataEntered: EventEmitter<IButtonQuestionField>;
  private btn: IButtonQuestionField;
  private inputTextControl: Control;

  constructor() {
    this.onDataEntered = new EventEmitter();
    this.inputTextControl = new Control();
  }

  private clicked(b: IButtonQuestion) {
    this.btn.selection = b;
    this.dataEntered();
  }

  private dataEntered(): void {
    this.btn.inputText = this.inputTextControl.value;
    this.onDataEntered.emit(this.btn);
  }

  private isSelected(b: IButtonQuestion) {
    return this.btn.selection && this.btn.selection === b ? true : false;
  }
}