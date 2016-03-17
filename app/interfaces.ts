import {Observable} from "rxjs/Observable";
export {IJWT} from "../server/interfaces";

export interface IButtonQuestion {
  legend: string;
  placeholderText: string;
  explanatoryText: string;
  buttons: {
    [key: number]: string;
  };
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
