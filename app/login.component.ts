import {Component} from "angular2/core";
import {AccountService} from "./account.service";
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators, AbstractControl} from "angular2/common";
import {map} from "rxjs/operator/map";
import {HTTP_PROVIDERS, Response} from "angular2/http";
import {Router, RouteParams, CanActivate, ComponentInstruction} from "angular2/router";
import {LoginService, checkLoggedOut} from "./login.service";

// The CanActivate breaks rerouting from CreateUser. TODO: Fix.
// @CanActivate((to: ComponentInstruction, fr: ComponentInstruction) => {
//   let loggedOut = checkLoggedOut();
//   return loggedOut;
// })
@Component({
  directives: [FORM_DIRECTIVES],
  providers: [AccountService, HTTP_PROVIDERS],
  template: `
<h1>Login</h1>
<br>
<form [ngFormModel]="loginForm" (ngSubmit)="onSubmit(loginForm.value)">
  <div class="form-group">
    <div [class.has-error]="username.touched && !username.valid"
         [class.has-success]="username.valid">
      <input id="usernameInput"
             class="form-control"
             type="text"
             placeholder="Username"
             [ngFormControl]="loginForm.controls['username']">
    </div>
    <br>
    <div *ngIf="username.hasError('required') && username.touched" class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Username cannot be blank.
    </div>
    <br>
    <div [class.has-error]="password.touched && !password.valid"
         [class.has-success]="password.valid">
      <input id="passwordInput"
             class="form-control"
             type="password"
             placeholder="Password"
             [ngFormControl]="loginForm.controls['password']">
    </div>
    <br>
    <div *ngIf="password.hasError('required') && password.touched"
         class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Password cannot be blank.
    </div>
    <div *ngIf="error"
         class="alert alert-danger">
      <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      Incorrect credentials
    </div>
    <br>
    <input type="submit"
           class="btn btn-primary"
           value="Submit"
           [class.disabled]="!loginForm.valid">
  </div>
</form>
` // TODO: Password lockout
})
export class Login {
  private loginForm: ControlGroup;
  private username: AbstractControl;
  private password: AbstractControl;
  private error: string;

  constructor(
    fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private loginService: LoginService
    ) {
    this.loginForm = fb.group({
      "username": ["", Validators.required],
      "password": ["", Validators.required]
    });
    this.username = this.loginForm.controls["username"];
    this.password = this.loginForm.controls["password"];
  }

  onSubmit() {
    this.error = null;
    if (this.loginForm.valid) {
      this.accountService.submitLogin(this.username.value, this.password.value)
        .map((res: Response) => res.json())
        .subscribe(
        data => {
          localStorage.setItem("jwt", data.jwt);
          this.accountService.doCheckJWT();
          this.loginService.loginEvent.subscribe(() => {
            this.router.parent.navigate(["/DailyForm"]);
          });
        },
        error => {
          this.error = error.json().error;
        }
        );
    } else {
      alert("Invalid submission. Correct errors and resubmit.");
    }
  }

}
