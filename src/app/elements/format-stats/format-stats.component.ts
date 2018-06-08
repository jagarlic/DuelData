import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-format-stats',
  templateUrl: './format-stats.component.html',
  styleUrls: ['./format-stats.component.css']
})
export class FormatStatsComponent implements OnInit {

  colors: Observable<any>;
  selectedFormat: string = "Select Format";
  draftFormats: string[] = ["Dominaria", "M25", "RIX/RIX/IXL"];

  public getDataForSet(setName) {
    this.selectedFormat = setName;
    this.colors = this.database.list(setName).valueChanges();
    this.colors.subscribe(colors => {
      console.log(colors.length);
      for (let i = 0; i < colors.length; i++) {
        let winPercentage = colors[i].wins / (colors[i].wins + colors[i].losses);
        this.singleChartData.push(winPercentage);
      }
      // this.barChartData[0].data.push()
    })
  }

  constructor(private database: AngularFireDatabase) { }

  ngOnInit() {
    // this.getDataForSet("Dominaria");
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 1
        }
      }]
    }
  };
  public singleChartLabels: string[] = ['Black', 'Green', 'Red', 'Blue', 'White'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public singleChartData: Array<number> = [];

  public singleChartColors: Array<any> = [
    {
      backgroundColor: ["#343a40", "#28a745", "#dc3545", "#005cbf", "#f8f9fa"]
    }
  ]

}
