import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { SwissComponent } from './swiss/swiss.component';
import { RoundrobinComponent } from './roundrobin/roundrobin.component';
import { player } from '../../player';
import { NavComponent } from '../nav/nav.component'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  eventName: string;
  eventTypes: string[];
  selectedEventType: string;
  selectedRoundCount : string;

  formatEventValidationAlert : string;
  playerValidationAlert : string;
  playerCountValidationAlert : string;
  validated = false;

  constructor(private router : Router, private authService : AuthService, private cdRef: ChangeDetectorRef) {
  }

  loadData() {
    this.eventTypes = ["Swiss", "Round Robin"];
    this.selectedEventType = "Event Type";
    this.selectedRoundCount = "# of Rounds";
    this.cdRef.detectChanges();
    console.log("changes detected");
  }

  selectEventType(type) {
    this.selectedEventType = type;
  }

  selectRoundCount(count : any) {
    this.selectedRoundCount = count;
  }

  makeArray(n: number): any[] {
    return Array(n);
  }

  draftFormats: string[] = ["Standard", "Modern", "Legacy", "Dominaria", "M25", "RIX-IXL", "AMK-H0U", "AER-KLD", "Other"];
  selectedDraftFormat: string = "Format";

  selectDraftFormat(format) {
    this.selectedDraftFormat = format;
  }

  playerCount: number = 0;

  players: player[];

  playerCountLog(count: any) { // without type info
    count = Number(count)
    console.log(count)
    if (isNaN(count)) {
      this.playerCountValidationAlert = "Number of players must be a number.";
    } else if (count > 40) {
      this.playerCountValidationAlert = "Number of players cannot exceed 40.";
    } else {
      this.playerCountValidationAlert = null;
      this.playerCount = count;
      this.players = Array(this.playerCount);
      for (let p = 0; p < count; p++) {
        let newPlayer : player = {name : '', index : 0, colors : '', setWins: 0, gameWins : 0, losses : 0, currentRoundCount : "Win Count"};
        newPlayer.index = p;
        this.players[p] = newPlayer;
      }
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

  createEvent() {
    console.log(this.eventName);
    let checkValidation = true;
    if (this.selectedDraftFormat == "Format" || this.selectedEventType == "Event Type") {
      checkValidation = false;
      this.formatEventValidationAlert = "Format or event type not selected";
    }
    let playerIndices = "";
    for (let p in this.players) {
      if (this.players[p].name == "") {
        let playerIndex = Number(p) + 1
        playerIndices += String(playerIndex) + " ";
        this.playerValidationAlert = "Player(s) " + playerIndices + " missing name.";
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
    this.loadData();
    // this.cdRef.detectChanges();s
  }

}
