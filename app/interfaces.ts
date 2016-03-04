export interface IButton {
  buttonText: string;
  buttonPoints: number;
}

export interface IButtonField {
  legend: string;
  explanatoryText: string;
  placeholderText: string;
  buttons: IButton[];
}
