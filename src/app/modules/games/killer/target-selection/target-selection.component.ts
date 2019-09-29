import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { AppProperties } from 'src/app/domain/app.properties';
import { targetFieldValidator } from 'src/app/shared/validators/target-field.validator';
import { uniqueFieldValueValidator } from 'src/app/shared/validators/unique-field-value.validator';
import { ArrayUtils } from 'src/app/shared/utils/array.utils';
import { Player } from 'src/app/domain/player';

@Component({
  selector: 'app-target-selection',
  templateUrl: './target-selection.component.html',
  styleUrls: ['./target-selection.component.css']
})
export class TargetSelectionComponent implements OnInit {

  game: KillerGame;

  targetForm: FormGroup;

  constructor(
    private playerService: PlayerService,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const players = this.playerService.getKillerPlayers();
    this.game = new KillerGame(players, AppProperties.MAX_HITS);
    this.game.initPlayers();
    this.initForm();
    console.log(this.game.players);
  }

  get targets() {
    return this.targetForm.get('targets') as FormArray;
  }

  getControl(index: number) {
    return this.targets.controls[index];
  }

  getPlayer(index: number) {
    return this.game.players[index];
  }

  initForm() {
    this.targetForm = this.fb.group({
      targets: this.fb.array([])
    });
    if (ArrayUtils.isNotEmpty(this.game.players)) {
      this.game.players.forEach(() => this.addPlayer());
    }
  }

  addPlayer() {
    this.targets.push(this.fb.control('', [Validators.required, targetFieldValidator, uniqueFieldValueValidator(this.targets)]));
  }

  onAddPlayer() {
    this.dialogService.openPlayerNameDialog(this.getFileterdStoredNames())
      .subscribe((name: string) => {
        this.addUniquePlayer(name);
      });  
  }

  addUniquePlayer(playerName) {
    if (this.game.addUniquePlayer(new Player(playerName))) {
      this.addPlayer();
      this.playerService.saveKillerPlayers(this.game.players);
    } else {
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

  onDelete(index: number) {
    this.game.deletePlayer(this.getPlayer(index));  
    this.targets.removeAt(index);
    this.playerService.saveKillerPlayers(this.game.players);
  }

  onStart() {
    for (let i = 0; i < this.game.players.length; i++) {
      this.getPlayer(i).gameData.target = this.getControl(i).value; 
    }
    this.playerService.saveNewNames(this.game.getPlayerNames());
    this.playerService.saveKillerPlayers(this.game.players);
    this.router.navigate(['killer/game']);
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
