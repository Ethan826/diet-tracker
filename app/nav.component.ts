import {AppComponent} from "./app.component";
import {Subscription} from "rxjs/Subscription";
import {Component, Injector, OnChanges} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AccountService, checkAuth} from "./account.service";
import {Response, HTTP_PROVIDERS} from "angular2/http";
import {appInjector} from "./app-injector";
import {Observable} from "rxjs/Observable";

@Component({
  selector: "nav-component",
  directives: [ROUTER_DIRECTIVES],
  providers: [AccountService, HTTP_PROVIDERS],
  inputs: ["AppComponent"],
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
            <li *ngIf="hasPermission('standard') || hasPermission('admin') | async">
              <a [routerLink]="['/MonthlyForm']">Monthly</a>
            <li *ngIf="hasPermission('standard') || hasPermission('admin') | async">
              <a [routerLink]="['/DailyForm']">Daily</a>
            </li>
            <li *ngIf="loggedIn | async">
              <a [routerLink]="['/Login']">Login</a>
            </li>
            <li *ngIf="loggedOut | async">
              <a [routerLink]="['/Login']"
                   (click)="accountService.logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent {
  loggedIn: Observable<boolean>;
  loggedOut: Observable<boolean>;

  constructor(private accountService: AccountService) {
    this.loggedIn = this.accountService.loggedIn;
    // This is necessary because you can't invert an Observable<boolean> directly
    this.loggedOut = this.loggedIn.map(x => { return !x });
  }

  hasPermission(audience: string): Observable<boolean> {
    return this.accountService.audiencesMap[audience];
  }
}
