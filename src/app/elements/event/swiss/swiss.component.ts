import { Component, OnInit, Input } from '@angular/core';
import { player } from '../../../player';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AuthService } from '../../../services/auth.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-swiss',
  templateUrl: './swiss.component.html',
  styleUrls: ['./swiss.component.css']
})
export class SwissComponent implements OnInit {

  @Input() players: player[];
  @Input() eventName: string;
  @Input() setName: string;
  @Input() roundCount: number;

  winCount: string = "Win Count";
  eventOver: boolean = false;
  eventSubmitted: boolean = false;
  evenPlayerCount: boolean = true;
  roundsPlayed: number = 1;

  constructor(private router: Router, private auth: AuthService,
    private eventService: EventsService) { }

  pairTable: player[][] = [];
  playedTable: number[][] = [];

  fillTable() {
    for (let i = 0; i < this.players.length; i++) {
      this.playedTable[i] = [];
    }
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
      this.playedTable[this.players.length] = [];
      let newPlayer: player = { name: 'Bye', index: this.players.length, colors: '', setWins: 0, gameWins: 0, losses: 0, currentRoundCount: "Win Count" };
      row2.push(newPlayer);
      this.players.push(newPlayer);
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
    if (this.players[p.index].currentRoundCount == "1" || this.players[p.index].currentRoundCount == "0") {
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
    if (this.roundsPlayed >= this.roundCount) {
      this.eventOver = true;
    } else {
      if (!this.evenPlayerCount && this.roundsPlayed % 2 == 1) {
        this.players[this.players.length - 1].setWins++;
      }
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
    console.log(this.playedTable);

    for (let i = 0; i < this.pairTable[0].length; i++) {
      let currTop = this.pairTable[0][i];
      let currBottom = this.pairTable[1][i];
      this.playedTable[currTop.index].push(currBottom.index);
      this.playedTable[currBottom.index].push(currTop.index);
    }

    this.players.sort(function (p1, p2) {
      if (p1.setWins < p2.setWins) {
        return 1;
      } else if (p1.setWins > p2.setWins) {
        return -1;
      } else {
        return 0;
      }
    });

    let pairedPlayers: number[] = [];
    let currPairIndex: number = 0;
    for (let i = 0; i < this.players.length; i++) {
      let player1 = this.players[i];
      if (pairedPlayers.indexOf(player1.index) < 0) {
        for (let j = 0; j < this.players.length; j++) {
          let player2 = this.players[j];
          if (player2.index != player1.index && !this.hasPlayed(player1.index, player2.index) &&
            pairedPlayers.indexOf(player2.index) < 0) {
            rotated[0][currPairIndex] = player1;
            rotated[1][currPairIndex] = player2;
            pairedPlayers.push(player1.index);
            pairedPlayers.push(player2.index);
            currPairIndex++;
            j = this.players.length;
          }
        }
      }
      if (i == this.players.length - 1 && pairedPlayers.length != this.players.length) {
        this.players = this.shuffle(this.players);
        console.log(this.players);
        pairedPlayers = [];
        console.log(pairedPlayers);
        i = 0;
        currPairIndex = 0;
        rotated = JSON.parse(JSON.stringify(matrix));
      }
    }

    this.players.sort(function (p1, p2) {
      if (p1.index > p2.index) {
        return 1;
      } else if (p1.index < p2.index) {
        return -1;
      } else {
        return 0;
      }
    });

    this.pairTable = rotated;
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  hasPlayed(p1, p2) {
    if (this.playedTable[p1].indexOf(p2) > -1) {
      return true;
    } else {
      return false;
    }
  }

  finishEvent() {
    this.eventSubmitted = true;
    if (!this.evenPlayerCount) {
      this.players.splice(this.players.length - 1, 1);
    }
    this.players.sort(function (p1, p2) {
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
    var regex = new RegExp(color, 'g');
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
