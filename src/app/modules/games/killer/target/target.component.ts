import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/domain/player';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent {

  @Input() player: Player;
  @Input() isEditMode = false;

  constructor() { }

}
