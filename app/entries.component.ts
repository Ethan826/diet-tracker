/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>

import {Component, Injector, OnInit} from "angular2/core";
import {AccountService} from "./account.service";
import {CanActivate, ComponentInstruction} from "angular2/router";
import {HTTP_PROVIDERS, Http} from "angular2/http";
import {checkAuth} from "./login.service";
import {FormsService} from "./forms.service";
import {Router, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from "angular2/router";

@CanActivate((to: ComponentInstruction, fr: ComponentInstruction) => {
  return checkAuth(["standard", "admin"]);
})
@Component({
  template: `
    <h1>Entries</h1>
    <table class="table table-responsive">
      <tr>
        <th>Date</th>
        <th>Score</th>
        <th>Carbs</th>
        <th></th>
      </tr>
      <tr *ngFor="#entry of entries | async">
        <td>{{entry.date}}</td>
        <td>
          {{entry.cravingscore + entry.energyscore + entry.hungerscore +
            entry.satietyscore + entry.wellbeingscore}}
        </td>
        <td>{{entry.carbsscore}}</td>
        <td><a (click)="handleDelete($event, entry.id)" href="#">Delete</a></td>
      </tr>
    </table>
  `,
  providers: [HTTP_PROVIDERS, FormsService, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})
export class Entries {
  private entries: Promise<Array<Object>>;

  constructor(private formsService: FormsService, private router: Router) {
    this.entries = new Promise((resolve, _) => {
      let array: Object[] = [];
      formsService.getUserEntries()
        .then(result => {
        for (let r in result) {
          if (result.hasOwnProperty(r)) {
            array.push(result[r]);
          }
        }
      });
      resolve(array);
    });
  }

  handleDelete(event: Event, id: number) {
    event.preventDefault();
    this.formsService.deleteEntry(id)
      .then(() => {
        location.reload();
      })
      .catch((e) => console.error(e));
  }
}
