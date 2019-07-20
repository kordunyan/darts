import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/domain/player';

@Component({
  selector: 'app-congratulation-dialog',
  templateUrl: './congratulation-dialog.component.html',
  styleUrls: ['./congratulation-dialog.component.css']
})
export class CongratulationDialogComponent {

  player: Player;

  constructor(
    public dialogRef: MatDialogRef<CongratulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.player = data.player;
  }

  onOk() {
    this.dialogRef.close();
  }

}
