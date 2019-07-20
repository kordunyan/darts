import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { Player } from 'src/app/domain/player';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { FormBuilder, FormArray, NgForm, FormControl, AbstractControl } from '@angular/forms';


const TARGET_REGEX = /^[\d]*$/;

@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.css']
})
export class TargetSelectComponent implements OnInit {

  targetForm = this.formBuilder.group({
    targets: this.formBuilder.array([])
  });

  game: KillerGame;

  constructor(
    private playerService: PlayerService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const players = this.playerService.getKillerPlayers();
    this.game = new KillerGame(players, 5);
    this.game.initPlayers();
  }

  areTargetsValid() {
    var result = true;
    this.game.players.forEach(player => {
      if (!TARGET_REGEX.test(player.gameData.target)) {
        result = false;
      }
    });
    return result;
  }

  onAddPlayer() {
    this.dialogService.openPlayerNameDialog(this.getFileterdStoredNames())
      .subscribe((name: string) => {
        this.addUniquePlayer(name);
      });
  }

  addUniquePlayer(playerName) {
    if (!this.game.addUniquePlayer(new Player(playerName))) {
      this.dialogService.openAlertDialog(`Player '${playerName}' has already exists`, '350px');
    }
  }

  getFileterdStoredNames(): string[] {
    const storedNames = this.playerService.getAllNames();
    const selectedNames = this.game.getPlayerNames();
    return storedNames.filter(storedName => {
      const sotredInLower = storedName.toLowerCase();
      return selectedNames.findIndex(selectedName => selectedName.toLowerCase() === sotredInLower) < 0;
    });
  }

  onStart() {
    this.playerService.saveNewNames(this.game.getPlayerNames());
    this.playerService.saveKillerPlayers(this.game.players);
    this.router.navigate(['killer/game']);
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onDelete(playerToRemove: Player) {
    this.game.deletePlayer(playerToRemove);
  }

  isInvalidTarget(ngForm: NgForm, targetIdx: number) {
    const input = this.getInput(ngForm, targetIdx);
    return input && input.invalid && (input.dirty || input.touched);
  }

  getInput(ngForm: NgForm, targetIdx: number): AbstractControl {
    return ngForm.form.controls['targetInput' + targetIdx];
  }
}
