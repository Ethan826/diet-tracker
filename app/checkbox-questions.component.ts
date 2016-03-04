import {Component, EventEmitter} from "angular2/core";
import {Control} from "angular2/common"
import {ICheckboxQuestion} from "./interfaces";

@Component({
  inputs: ["cbox"],
  outputs: ["onDataEntered"],
  selector: "checkbox-questions",
  template: `
    <div>
      <label>
        <input type="checkbox"
               (change)="clicked()">
          &emsp;
          {{cbox.checkboxPrompt}}
      </label>
    </div>
    <div *ngIf="cbox.checkboxInput && cbox.textPrompt"
         [ngFormControl]="inputTextControl"
         (keyup)=dataEntered()>
      {{cbox.textPrompt}}
    </div>
  `
})
export class CheckboxQuestions {
  onDataEntered: EventEmitter<ICheckboxQuestion>;
  private cbox: ICheckboxQuestion;
  private inputTextControl: Control;

  constructor() {
    this.onDataEntered = new EventEmitter();
    if(typeof this.cbox.textPrompt == undefined) { // Not working
      this.inputTextControl = null;
    } else {
      this.inputTextControl = new Control;
    }
  }

  private clicked() {
    this.cbox.checkboxInput = !this.cbox.checkboxInput;
    this.dataEntered();
    console.log(this.cbox.checkboxInput);
  }

  private dataEntered() {
    this.onDataEntered.emit(this.cbox);
  }
}
