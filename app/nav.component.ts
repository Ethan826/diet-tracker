import {AppComponent} from "./app.component";
import {Subscription} from "rxjs/Subscription";
import {Component, Injector} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AccountService} from "./account.service";
import {Response, HTTP_PROVIDERS} from "angular2/http";
import {appInjector} from "./app-injector";
import {Observable} from "rxjs/Observable";
import {LoginService} from "./login.service";
import {IJWT} from "./interfaces";

@Component({
  selector: "nav-component",
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS],
  template: `
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Diet Tracker</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li *ngIf="loginService.isAuthorized(['standard', 'admin'])">
              <a [routerLink]="['/DailyForm']">Daily</a>
            <li *ngIf="loginService.isAuthorized(['standard', 'admin'])">
              <a [routerLink]="['/MonthlyForm']">Monthly</a>
            </li>
            <li *ngIf="loginService.isAuthorized(['admin'])">
              <a [routerLink]="['/Admin']">Admin</a>
            <li *ngIf="loginService.loggedOut | async">
              <a [routerLink]="['/Login']">Login</a>
            </li>
            <li *ngIf="loginService.loggedIn | async">
              <a [routerLink]="['/Login']"
                   (click)="accountService.logout()">Logout</a>
            </li>
          </ul>
          <p *ngIf="jwtResult && jwtResult.username"
             class="nav navbar-text navbar-right">Logged in as {{jwtResult.username}}
          </p>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  private jwtResult: IJWT;

  constructor(private accountService: AccountService, private loginService: LoginService) {
    this.loginService.loginEvent.subscribe((jwtResult: IJWT) => {
      this.jwtResult = jwtResult;
      console.log(`Inside NavComponent, just learned that audience = ${jwtResult.aud} at ${Date.now() / 1000}`);
    });
  }
}
