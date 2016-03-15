import {AppComponent} from "./app.component";
import {Subscription} from "rxjs/Subscription";
import {Component, Injector, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AccountService, checkAuth} from "./account.service";
import {Response, HTTP_PROVIDERS} from "angular2/http";
import {appInjector} from "./app-injector";
import {Observable} from "rxjs/Observable";
import {LoginService} from "./login.service";

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
            <li *ngIf="hasPermission(['standard', 'admin'])">
              <a [routerLink]="['/MonthlyForm']">Monthly</a>
            <li *ngIf="hasPermission(['standard', 'admin'])">
              <a [routerLink]="['/DailyForm']">Daily</a>
            </li>
            <li>
              <a [routerLink]="['/Login']">Login</a>
            </li>
            <li>
              <a [routerLink]="['/Login']"
                   (click)="accountService.logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
`
})
export class NavComponent implements OnInit {
  private audience: string;

  constructor(private accountService: AccountService, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.loginEvent.subscribe((audience: string) => {
      this.audience = audience;
      console.log(`Inside NavComponent, just learned that audience = ${audience} at ${Date.now() / 1000}`);
    });
  }

  hasPermission(permittedAudiences: string[]): boolean {
    return permittedAudiences.indexOf(this.audience) >= 0;
  }
}
