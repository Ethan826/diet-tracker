import {Component, AfterViewInit} from "angular2/core";
import {CanActivate, ComponentInstruction} from "angular2/router";
import {checkAuth} from "./login.service";
import {FormsService} from "./forms.service";

declare let google: any;

@CanActivate(
  (to: ComponentInstruction, fr: ComponentInstruction) => {
    return checkAuth(["standard", "admin"]);
  })
@Component({
  providers: [FormsService],
  template: `
    <div id="chart-fixer">
      <div id="chart"></div>
    </div>
  `
})
export class MonthlyForm implements AfterViewInit {

  constructor(private formsService: FormsService) { }

  ngAfterViewInit() {
    this.processData().then((data: Array<Array<any>>) => {
      data.unshift(["Date", "Score", { "type": "string", "role": "style" }]);
      google.charts.setOnLoadCallback(this.drawChart(data));
      // $(window).resize($.debounce(250, () => this.drawChart(data))); // No JQuery debounce!?
      $(window).resize(() => this.drawChart(data));
    });
  }

  drawChart(data: Array<Array<any>>) {
    let table = new google.visualization.arrayToDataTable(data);
    let chart = new google.visualization.LineChart(document.getElementById("chart"));
    let options = {
      "title": "Diet Tracker",
      "pointSize": 7,
      "vAxis": {
        viewWindowMode: "explicit",
        viewWindow: {
          min: 0,
          max: 20
        }
      }
    };
    chart.draw(table, options);
  }

  private processData() {
    return new Promise((res, rej) => {
      this.formsService.getUserEntries().then(data => {
        let dataArray: Array<Array<any>> = [];
        for (let i in data) {
          if (data.hasOwnProperty(i)) {
            let datum = data[i];
            let datestring = datum["date"];
            let date = new Date(
              datestring.slice(0, 4),
              datestring.slice(5, 7),
              datestring.slice(8, 10)
              );
            let color: string;
            switch (datum["carbsscore"]) {
              case 0:
                color = "#00ff00";
                break;
              case 1:
                color = "#ffff00";
                break;
              case 2: color = "#ff0000";
            }
            let score = datum["cravingscore"] + datum["energyscore"] +
              datum["hungerscore"] + datum["satietyscore"] +
              datum["wellbeingscore"];
            dataArray.push([date, score, `point { size: 12; fill-color: ${color}; }`]);
          }
        }
        res(dataArray);
      });
    });
  }
}
