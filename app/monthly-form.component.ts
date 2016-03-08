import {Component, OnInit} from "angular2/core";

declare let google: any;

@Component({
  template: `
    <div id="chart-fixer">
      <div id="chart"></div>
    </div>
  `
})
export class MonthlyForm implements OnInit {
  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
    window.onresize = this.drawChart;
  }

  private drawChart() {
    let data = new google.visualization.DataTable();
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Total Score');
    data.addRows([
      [new Date(2015, 5, 7), 4],
      [new Date(2015, 5, 8), 5],
      [new Date(2015, 5, 9), 8],
      [new Date(2015, 5, 10), 7],
      [new Date(2015, 5, 11), 1],
      [new Date(2015, 5, 12), 14],
      [new Date(2015, 5, 13), 8],
      [new Date(2015, 5, 14), 4]
    ]);
    let options = {
      'title': "Diet Tracker",
      "vAxis": {
        viewWindowMode: "explicit",
        viewWindow: {
          min: 0,
          max: 20
        }
      }
    };
    let chart = new google.visualization.LineChart(document.getElementById("chart"));
    chart.draw(data, options);
  }
}
