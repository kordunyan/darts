import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Player } from 'src/app/domain/player';
import { DialogService } from 'src/app/service/dialog.service';
import { PlayerService } from 'src/app/service/storage/player.service';

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent {

  @Input() players: Player[] = [];

  @Output() playersSelected = new EventEmitter<Player[]>();
  @Output() back = new EventEmitter();

  constructor(
    private dialogService: DialogService,
    private playerService: PlayerService
  ) { }

  addPlayer() {
    this.dialogService.openPlayerNameDialog(this.getFileterdStoredNames())
      .subscribe((name: string) => {
        this.players.push(new Player(name));  
      });
  }

  onStart() {
    this.savePlayerNames();
    this.playersSelected.emit(this.players);
  }

  onBack() {
    this.back.emit();
  }

  savePlayerNames() {
    this.playerService.saveNewNames(this.getPlayerNames());
  }

  getFileterdStoredNames(): string[] {
    const storedNames = this.playerService.getAllNames();
    const selectedNames = this.getPlayerNames();
    return storedNames.filter(storedName => {
      const sotredInLower = storedName.toLowerCase();
      return selectedNames.findIndex(selectedName => selectedName.toLowerCase() === sotredInLower) < 0;
    });
  }

  onDelete(playerToRemove: Player) {
    this.players = this.players.filter(player => player.name !== playerToRemove.name);
  }

  getPlayerNames(): string[] {
    return this.players.map(player => player.name);
  }

}
