import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  players: Player[] = [];
  game: KillerGame;

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.players = this.playerService.getKillerPlayers(); 
    this.game = new KillerGame(this.players, 5);
  }

  reset() {
    this.router.navigate(['killer/targets']);
  }

  nextPlayer() {
    this.game.nextPlayer();
    this.playerService.saveKillerPlayers(this.players);
  }

  previousPlayer() {
    this.game.previousPlayer();
    this.playerService.saveKillerPlayers(this.players);
  }

  changedScore() {
    this.game.changedPlayerScore(); 
  }

  changedmaxHits() {
    this.game.changedPlayerScore(); 
  }

  onDelete(playerToRemove: Player) {
    this.game.deletePlayer(playerToRemove);
    this.playerService.saveKillerPlayers(this.players);
  }
}
