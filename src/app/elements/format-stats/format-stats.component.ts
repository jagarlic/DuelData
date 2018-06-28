import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ColorsService } from '../../services/colors.service';

@Component({
  selector: 'app-format-stats',
  templateUrl: './format-stats.component.html',
  styleUrls: ['./format-stats.component.css']
})
export class FormatStatsComponent implements OnInit {

  colors: Observable<any>;
  selectedFormat: string = "Select Format";
  draftFormats: string[] = ["Standard", "Modern", "Legacy", "Pauper", "Dominaria", "M25", "RIX-IXL", "AMK-HOU",
  "AER-KLD", "EMN-SOI", "OGW-BFZ", "Magic Origins", "Khans Block", "M15", "Theros Block", "M14", "RTR Block", "Innistrad", "Other"];

  public getDataForSet(setName) {
    if (this.selectedFormat != "Select Format") {
      this.singleChartData[0].data.length = [];
      this.dualChartData[0].data = [];
      this.dualPieChartData = [];
      this.singlePieChartData = [];
    }
    this.selectedFormat = setName;
    this.colors = this.database.list(setName).valueChanges();
    this.colors.subscribe(colors => {
      for (let i = 0; i < colors.length; i++) {
        let winPercentage = colors[i].wins / (colors[i].wins + colors[i].losses);
        this.singleChartData[0].data.push(Math.round(winPercentage * 100) / 100);
        this.singlePieChartData.push(colors[i].decksPlayed);
        if (i == 5) {
          for (let colorPair in colors[i]) {
            let dWinPercentage = colors[i][colorPair].wins / (colors[i][colorPair].wins + colors[i][colorPair].losses);
            this.dualChartData[0].data.push(Math.round(dWinPercentage * 100) / 100);
            this.dualPieChartData.push(colors[i][colorPair].decksPlayed);
          }
        }
      }
    })
  }

  constructor(private database: AngularFireDatabase, private colorsService: ColorsService) { }

  ngOnInit() {
    this.colorsService.createNewSet("Standard");
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 1,
          fontColor: 'white'
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: 'white'
        }
      }]
    },
    legend: {
      display: false
    }
  };

  public pieChartOptions : any = {
    legend: {
      display: false
    }
  };

  public singleChartData: any[] = [{ data: [], label: 'Win Percentage' }];
  public singlePieChartData: Array<number> = [];
  public singleChartLabels: string[] = ['Black', 'Green', 'Red', 'Blue', 'White'];
  public singleChartColors: Array<any> = [{ backgroundColor: ["#343a40", "#28a745", "#dc3545", "#005cbf", "#dbdbdb"] }];

  public dualChartData: any[] = [{ data: [], label: 'Win Percentage' }];
  public dualPieChartData: Array<number> = [];
  public dualChartLabels: string[] = ['BG', 'BR', 'BU', 'BW', 'GR', 'GU', 'GW', 'RU', 'RW', 'UW'];
  public dualChartColors: Array<any> = [
    { backgroundColor: ["#005200", "#730000", "#000073", "#666666", "#4d6b00", "#008B8B", "#99eb99", "#73008c", "#ff8080", "#6666ff"] }];
}
