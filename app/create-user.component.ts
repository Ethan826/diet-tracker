import {Component, OnInit, Injectable} from "angular2/core";
import {FORM_DIRECTIVES, Control, ControlGroup, Validators, AbstractControl, FormBuilder} from "angular2/common";
import {AccountService} from "./account.service";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {Router, RouterLink, RouteParams} from "angular2/router";

declare let zxcvbn: any;

@Injectable()
@Component({
  selector: "create-user",
  providers: [AccountService, HTTP_PROVIDERS],
  template: `
    <h1>Create User</h1>
    <br>
    <form [ngFormModel]="createUserForm" (ngSubmit)="handleSubmit(createUserForm.value)">
    <div class="form-group">
      <div [class.has-error]="!usernameControl.valid && usernameControl.touched"
           [class.has-success]="usernameControl.valid">
        <input id="usernameInput"
               [ngFormControl]="usernameControl"
               class="form-control"
               type="text"
               placeholder="Username">
      </div>
      <br>
      <div *ngIf="usernameControl.hasError('required') && usernameControl.touched"
           class="alert alert-danger">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        Username cannot be blank.
      </div>
      <div [class.has-error]="!passwordControl.valid && passwordControl.touched"
           [class.has-success]="passwordControl.valid">
        <input id="passwordInput"
               class="form-control"
               type="password"
               placeholder="Password"
               [ngFormControl]="passwordControl">
      </div>
      <br>
      <div *ngIf="passwordControl.hasError('required') && passwordControl.touched"
           class="alert alert-danger">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        Password cannot be blank.
      </div>
      <div *ngIf="passwordControl.hasError('weakPassword') && passwordControl.touched"
           class="alert alert-danger">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        Password is too weak
      </div>
      <div [class.has-error]="!confirmPasswordControl.valid && confirmPasswordControl.touched"
           [class.has-success]="confirmPasswordControl.valid && confirmPasswordControl.touched">
        <input id="confirmPasswordInput"
               class="form-control"
               type="password"
               placeholder="Confirm Password"
               [ngFormControl]="confirmPasswordControl">
      </div>
      <br>
      <div *ngIf="confirmPasswordControl.hasError('passwordMismatch') && confirmPasswordControl.touched"
           class="alert alert-danger">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        Passwords do not match
      </div>
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
  private confirmPasswordControl: AbstractControl;
  private self: any;

  constructor(
    fb: FormBuilder,
    private accountService: AccountService,
    public router: Router,
    public routeParams: RouteParams
    ) {
    this.createUserForm = fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.compose([Validators.required, this.passwordStrengthValidator])],
      "confirmPassword": ["", this.passwordsMatchValidator]
    });
    this.usernameControl = this.createUserForm.controls["username"];
    this.passwordControl = this.createUserForm.controls["password"];
    this.confirmPasswordControl = this.createUserForm.controls["confirmPassword"];
  }

  private handleSubmit() {
    if (this.createUserForm.valid) {
      this.accountService.submitNewCreds(this.usernameControl.value, this.passwordControl.value)
        .subscribe(
        data => {
          console.log(`Received response from handleSubmit ${data}`);
          this.router.parent.navigate(["/Login"]); // <================================== Why you no work, ma fren?
        },
        error => {
          console.error(error);
        });
    } else {
      alert("Correct the errors in the form, then resubmit.");
    }
  }

  private passwordStrengthValidator = (control: Control): { [s: string]: boolean } => {
    if (this.hasOwnProperty("passwordControl")) {
      // This is a hack to make sure the passwordsMatchValidator updates on entry of data in the
      // password field, not just the matching passwords field
      this.confirmPasswordControl.updateValueAndValidity();
    }
    if (zxcvbn(control.value).score < 2) {
      return { weakPassword: true };
    }
  };

  private passwordsMatchValidator = (control: Control): { [s: string]: boolean } => {
    if (this.hasOwnProperty("passwordControl") && control.value !== this.passwordControl.value) {
      return { passwordMismatch: true };
    }
  };
}
