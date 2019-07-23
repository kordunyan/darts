import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { AppProperties } from 'src/app/domain/app.properties';
import { GroupSplitter } from 'src/app/game-manger/group.splitter';



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
    private dialogService: DialogService,
    private groupSplitter: GroupSplitter,
    private router: Router
  ) { }

  ngOnInit() {
    this.players = this.playerService.getKillerPlayers(); 
    this.groupSplitter.splitInGroups(this.players);
    this.game = new KillerGame(this.players, this.getMaxHits());
    this.playerService.saveMaxHits(this.game.maxHits);
    this.game.onWin().subscribe(winner => {
      this.dialogService.openCongratulationDialog(winner);
      this.playerService.saveKillerPlayers(this.players);
    });
    this.game.changedPlayerScore();
  }

  getMaxHits() {
    const storedMaxHits = this.playerService.getMaxHits();
    if (storedMaxHits == null) {
      return AppProperties.MAX_HITS;
    }
    return storedMaxHits;
  }

  reset() {
    this.router.navigate(['killer/targets']);
  }

  skip() {
    this.game.skip();
    this.playerService.saveKillerPlayers(this.players);
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
    this.playerService.saveMaxHits(this.game.maxHits);
  }

  onDelete(playerToRemove: Player) {
    this.game.deletePlayer(playerToRemove);
    this.playerService.saveKillerPlayers(this.players);
    this.groupSplitter.splitInGroups(this.game.players);
    this.game.checkForWinner();
  }
}
