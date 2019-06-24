import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { Router } from '@angular/router';
import { KillerGameData } from 'src/app/domain/killer.game-data';
import { DialogService } from 'src/app/service/dialog.service';

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
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit() {
    const players = this.playerService.getKillerPlayers(); 
    players.forEach(player => this.initPlayer(player));
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

  addPlayer() {
    this.dialogService.openPlayerNameDialog(this.getFileterdStoredNames())
      .subscribe((name: string) => {
        this.players.push(this.initPlayer(new Player(name)));  
      });
  }

  initPlayer(player: Player): Player {
    player.lost = false;
    player.current = false;
    player.gameData = new KillerGameData();
    return player;
  }

  getFileterdStoredNames(): string[] {
    const storedNames = this.playerService.getAllNames();
    const selectedNames = this.getPlayerNames();
    return storedNames.filter(storedName => {
      const sotredInLower = storedName.toLowerCase();
      return selectedNames.findIndex(selectedName => selectedName.toLowerCase() === sotredInLower) < 0;
    });
  }

  getPlayerNames(): string[] {
    return this.players.map(player => player.name);
  }

  onStart() {
    this.playerService.saveNewNames(this.getPlayerNames());
    this.playerService.saveKillerPlayers(this.players);
    this.router.navigate(['killer/game']);
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onDelete(playerToRemove: Player) {
    this.players = this.players.filter(player => player.name !== playerToRemove.name);
  }

}
