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
