import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { SwissComponent } from './swiss/swiss.component';
import { RoundrobinComponent } from './roundrobin/roundrobin.component';
import { player } from '../../player';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  constructor(private router : Router, private authService : AuthService) {
  }

  eventName: string;
  eventTypes: string[] = ["Swiss", "Round Robin"];
  selectedEventType: string = "Event Type";

  selectEventType(type) {
    this.selectedEventType = type;
  }

  draftFormats: string[] = ["Dominaria", "M25", "RIX/RIX/IXL"];
  selectedDraftFormat: string = "Draft Format";

  selectDraftFormat(format) {
    this.selectedDraftFormat = format;
  }

  playerCount: number = 0;

  players: player[];

  playerCountLog(count: any) { // without type info
    count = Number(count)
    if (typeof count == "number") {
      this.playerCount = count;
    }
    this.players = Array(this.playerCount);
    for (let p = 0; p < count; p++) {
      let newPlayer : player = {name : '', index : 0, colors : '', setWins: 0, gameWins : 0, losses : 0, currentRoundCount : "Win Count"};
      newPlayer.index = p;
      this.players[p] = newPlayer;
    }
  }

  addColorToPlayer(player: player, color : string) {
    if (this.players[player.index].colors.search(color) == -1) {
      this.players[player.index].colors += color;
    } else {
      this.players[player.index].colors = this.players[player.index].colors.replace(color, "");
    }
  }

  logEventName(eName : string) {
    this.eventName = eName;
  }

  playerNameLog(player: player, name: string) {
    this.players[player.index].name = name;
  }

  formatEventValidationAlert : string;
  playerValidationAlert : string;
  validated = false;

  createEvent() {
    console.log(this.eventName);
    let checkValidation = true;
    if (this.selectedDraftFormat == "Draft Format" || this.selectedEventType == "Event Type") {
      checkValidation = false;
      this.formatEventValidationAlert = "Draft format or event type not selected";
    }
    let playerIndices = "";
    for (let p in this.players) {
      if (this.players[p].colors == "" || this.players[p].name == "") {
        let playerIndex = Number(p) + 1
        playerIndices += String(playerIndex) + " ";
        this.playerValidationAlert = "Player(s) " + playerIndices + " missing name or colors.";
        checkValidation = false;
      }
    }
    if (checkValidation) {
      this.playerValidationAlert = null;
      this.formatEventValidationAlert = null;
      this.validated = true;
    }
  }

  ngOnInit() {
    console.log(this.authService.getUserData());

    // this.selectedEventType = "Event Type";
  }

}
