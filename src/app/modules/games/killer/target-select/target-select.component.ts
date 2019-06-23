import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { Router } from '@angular/router';
import { KillerGameData } from 'src/app/domain/killer.game-data';

const TARGET_REGEX = /^[\d]*$/;

@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.css']
})
export class TargetSelectComponent implements OnInit {

  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
    const players = this.playerService.getKillerPlayers(); 
    players.forEach(player => {
      player.lost = false;
      player.current = false;
      player.gameData = new KillerGameData();
    });
    this.players = players;
  }

  areTargetsValid() {
    var result = true;
    this.players.forEach(player => {
      if (!TARGET_REGEX.test(player.gameData.target)) {
        result = false;
      }
    });
    return result;
  }

  onStart() {
    this.playerService.saveKillerPlayers(this.players);
    this.router.navigate(['killer/game']);
  }

  onBack() {
    this.router.navigate(['killer/players']);
  }

}
