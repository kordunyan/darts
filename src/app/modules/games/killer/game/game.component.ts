import { Component, OnInit, HostListener } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { AppProperties } from 'src/app/domain/app.properties';
import { GroupSplitter } from 'src/app/game-manger/group.splitter';
import { KEY_CODE } from 'src/app/domain/key.type';



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

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      return;
    }
    switch(event.keyCode) {
        case KEY_CODE.NEXT: 
          this.nextPlayer();
          break;
        case KEY_CODE.PREVIOUS: 
          this.previousPlayer();
          break;
        case KEY_CODE.ADD:
          this.addScoreToCurrent();
          break;
        case KEY_CODE.SUBSTRACT:
          this.substractScoreToCurrent();
          break;
    }
  }

  @HostListener('window:keydown.control.ArrowRight', ['$event'])
  keyCombinationEvent(event: KeyboardEvent) {
    this.skip();
  }

  substractScoreToCurrent() {
    const player = this.game.getCurrentPlayer();
    if (player.gameData.hitsNumber > 0) {
      player.gameData.hitsNumber--;
      this.changedScore();
    }
  }

  addScoreToCurrent() {
    const player = this.game.getCurrentPlayer();
    player.gameData.hitsNumber++;
    this.changedScore();
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
    this.players = this.game.players;
    this.playerService.saveKillerPlayers(this.game.players);
    this.groupSplitter.splitInGroups(this.game.players);
    this.game.checkForWinner();
  }
}
