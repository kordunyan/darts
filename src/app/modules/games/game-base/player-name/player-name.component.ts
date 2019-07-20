import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/domain/player';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-player-name',
  templateUrl: './player-name.component.html',
  styleUrls: ['./player-name.component.css']
})
export class PlayerNameComponent {

  @Input() player: Player;
  @Input() playMode = false;
  @Output() delete = new EventEmitter();

  constructor(
    private dialogService: DialogService
  ) { }

  onDeleteClicked() {
    this.dialogService.openConfirmDialog('Are you sure to delete player?')
      .subscribe(result => {
        if (result) {
          this.delete.emit();
        }
    });  
  }

}
