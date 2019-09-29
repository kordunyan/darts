import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/service/storage/player.service';
import { DialogService } from 'src/app/service/dialog.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KillerGame } from 'src/app/game-manger/killer.game';
import { AppProperties } from 'src/app/domain/app.properties';

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
  }

  get targets() {
    return this.targetForm.get('targets') as FormArray;
  }

  getControl(index: number) {
    return this.targets.controls[index];
  }

  initForm() {
    this.targetForm = this.fb.group({
      targets: this.fb.array([])
    });
  }

  onAddPlayer() {
    this.targets.push(this.fb.control('', [Validators.required]));
  }

  checkStatus() {
    console.log(this.targetForm);
  }

}
