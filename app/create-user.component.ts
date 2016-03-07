import {Component, OnInit} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, AbstractControl, FormBuilder} from "angular2/common";

declare let zxcvbn: any;

@Component({
  selector: "create-user",
  template: `
    <h1>Create User</h1>
    <br>
    <form [ngFormModel]="createUserForm" (ngSubmit)="handleSubmit(createUserForm)">
    <div class="form-group">
      <input id="usernameInput"
             class="form-control"
             type="text"
             placeholder="Username"
             [ngFormControl]="usernameControl">
      <br>
      <input id="passwordInput"
             class="form-control"
             type="password"
             placeholder="Password"
             [ngFormControl]="passwordControl">
      <br>
      <input id="confirmPasswordInput"
             class="form-control"
             type="password"
             placeholder="Confirm Password"
             [ngFormControl]="confirmPasswordControl">
      <br>
      <input type="submit"
             value="Submit"
             class="btn btn-primary"
             [class.disabled]="!createUserForm.valid">
    </div>
    </form>
  `
})
export class CreateUser {
  private createUserForm: ControlGroup;
  private usernameControl: AbstractControl;
  private passwordControl: AbstractControl;
  private confirmPasswordControl: AbstractControl
  private self: any;

  constructor(fb: FormBuilder) {
    this.createUserForm = fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.compose([Validators.required, this.passwordStrengthValidator])],
      "confirmPassword": ["", this.passwordsMatchValidator]
    });
    this.usernameControl = this.createUserForm.controls["username"];
    this.passwordControl = this.createUserForm.controls["password"];
    this.confirmPasswordControl = this.createUserForm.controls["confirmPassword"];
  }

  private handleSubmit(group: ControlGroup) {
    console.log(this.usernameControl.errors);
    console.log(this.passwordControl.errors);
    console.log(this.confirmPasswordControl.errors);
  }

  private passwordStrengthValidator = (control: Control): { [s: string]: boolean } => {
    if (this.hasOwnProperty("passwordControl")) {
      // This is a hack to make sure the passwordsMatchValidator updates on entry of data in the
      // password field, not just the matching passwords field
      this.confirmPasswordControl.updateValueAndValidity();
    }
    if (zxcvbn(control.value).score < 2) {
      return { weakPassword: true }
    }
  }

  private passwordsMatchValidator = (control: Control): { [s: string]: boolean } => {
    if (this.hasOwnProperty("passwordControl") && control.value !== this.passwordControl.value) {
      return { passwordMismatch: true };
    }
  }
}
