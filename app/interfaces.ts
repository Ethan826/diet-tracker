import {Observable} from "rxjs/Observable";

export interface IButtonQuestion {
  buttonText: string;
  buttonPoints: number;
}

export interface IButtonQuestionField {
  legend: string;
  explanatoryText: string;
  placeholderText: string;
  buttons: IButtonQuestion[];
  selection: IButtonQuestion;
  inputText: string;
}

export interface ICheckboxQuestion {
  checkboxPrompt: string;
  textPrompt?: string;
  checkboxInput: boolean;
  textInput?: string;
}

export interface IAudiencesMap {
  [audience: string]: Observable<boolean>;
}
