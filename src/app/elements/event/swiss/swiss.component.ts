import { Component, OnInit, Input } from '@angular/core';
import { player } from '../../../player';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from'../../../services/events.service';

@Component({
  selector: 'app-swiss',
  templateUrl: './swiss.component.html',
  styleUrls: ['./swiss.component.css']
})
export class SwissComponent implements OnInit {

  @Input() players: player[];
  @Input() eventName: string;
  @Input() setName: string;

  winCount: string = "Win Count";
  eventOver: boolean = false;
  eventSubmitted: boolean = false;
  evenPlayerCount: boolean = true;
  roundsPlayed: number = 1;

  constructor(private router : Router, private auth : AuthService,
  private eventService : EventsService) { }

  pairTable: player[][] = [];

  fillTable() {
    var row1: player[] = [];
    for (let i = 0; i < this.players.length / 2; i++) {
      row1.push(this.players[i]);
    }
    var row2: player[] = [];
    for (let j = Math.ceil(this.players.length / 2); j < this.players.length; j++) {
      row2.push(this.players[j]);
    }
    if (row1.length != row2.length) {
      this.evenPlayerCount = false;
      let newPlayer: player = { name: 'Bye', index: 0, colors: '', setWins: 0, gameWins: 0, losses: 0, currentRoundCount: "Win Count" };
      row2.push(newPlayer);
    }
    this.pairTable.push(row1);
    this.pairTable.push(row2);
  }

  logWin(count, p) {
    if (this.players[p.index].currentRoundCount == "2") {
      this.players[p.index].currentRoundCount = "";
      this.players[p.index].setWins--;
      this.players[p.index].gameWins -= 2;
    }
    if (this.players[p.index].currentRoundCount == "1") {
      this.players[p.index].currentRoundCount = "";
      this.players[p.index].gameWins--;
      this.players[p.index].losses--;
    }
    this.players[p.index].currentRoundCount = count;
    count = Number(count);
    if (count == 2) {
      this.players[p.index].setWins += 1;
    } else {
      this.players[p.index].losses += 1;
    }
    this.players[p.index].gameWins += count;
  }

  nextRound() {
    if ((this.evenPlayerCount == true && this.roundsPlayed >= this.players.length - 1) || 
    (this.evenPlayerCount == false && this.roundsPlayed >= this.players.length)) {
      this.eventOver = true;
    } else {
      this.roundsPlayed++;
      this.rotateMatrix(this.pairTable);
      for (let player of this.players) {
        player.currentRoundCount = "Win Count";
      }
    }
  }

  rotateMatrix(matrix) {
    var n = matrix.length;
    let rotated = JSON.parse(JSON.stringify(matrix));

    for (let i = 0; i < 2; i++) {
      var n = matrix[0].length;
      for (let j = 0; j < n; j++) {
        if (i == 0 && j == 0) {
          rotated[i][j] = matrix[i][j];
        } else if (i == 0 && j == 1) {
          rotated[i][j] = matrix[j][i];
        } else if (i == 0) {
          rotated[i][j] = matrix[i][j - 1]
        } else if (i == 1 && j == n - 1) {
          rotated[i][j] = matrix[0][j];
        } else if (i == 1) {
          rotated[i][j] = matrix[i][j + 1];
        }
      }
    }
    this.pairTable = rotated;
  }

  finishEvent() {
    this.eventSubmitted = true;
    this.players.sort(function(p1, p2) {
      if (p1.setWins < p2.setWins) {
        return 1;
      } else if (p1.setWins > p2.setWins) {
        return -1;
      } else {
        return 0;
      }
    });
    this.eventService.submitUserData(this.players, this.eventName, this.setName);
    this.eventService.handleData(this.players, this.setName);
  }

  checkColors(player, color) {
    let colors = player.colors;
    var regex = new RegExp( color, 'g' );
    if (colors.search(regex) != '-1') {
      return true;
    } else {
      return false;
    }
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.fillTable();
  }

}
