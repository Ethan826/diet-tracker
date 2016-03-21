import {Component} from "angular2/core";

@Component({
  selector: "front",
  template: `
    <h1>Diet Tracker</h1>
    <p>
      This webapp is an interactive version of the diet tracker worksheets
      Dr. David Ludwig provides in his <i>Always Hungry</i> diet book. The
      Daily Form entries are saved and used to create the chart view in
      Monthly. The chart generally relates to well being: the higher the
      better. The color of the dot represents the amount of processed
      carbohydrate you ate that day.
    </p>

    <p>
      The chart is useful for spotting how sensitive you are to processed
      carbohydrates. You may see a connection between days with low well being
      associated with higher consumption of processed carbohydrates. If you
      do, that&#8217;s a sign you should cut back. See <a href="http://drdavidludwig.com/">
      here</a> for more information.
    </p>
  `
})
export class FrontComponent { }
