import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/domain/player';

@Component({
  selector: 'app-hits-counter',
  templateUrl: './hits-counter.component.html',
  styleUrls: ['./hits-counter.component.css']
})
export class HitsCounterComponent implements OnInit {

  @Input() player: Player;
  @Output() chagedScore = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.player.gameData.hitsNumber) {
      this.player.gameData.hitsNumber = 0;
    }
  }

  changeScore(score) {
    this.player.gameData.hitsNumber = score;
    this.chagedScore.emit();
  }

}
