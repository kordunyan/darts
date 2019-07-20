import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {filter} from 'rxjs/operators';
import { PlayerNameDialogComponent } from '../modules/games/game-base/player-name-dialog/player-name-dialog.component';
 import { ConfirmDialogComponent } from '../shared/components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from '../shared/components/dialogs/alert/alert.component';
import { Player } from '../domain/player';
import { CongratulationDialogComponent } from '../shared/components/dialogs/congratulation-dialog/congratulation-dialog.component';



@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openPlayerNameDialog(availableNames: string[]): Observable<any> {
    return this.dialog.open(PlayerNameDialogComponent, {
      width: '500px',
      data: {
        availableNames: availableNames
      }
    })
    .beforeClose()
    .pipe(
      filter((name: string) => name !== undefined)
    );
  }

  openConfirmDialog(message: string, width: string = '300px'): Observable<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: width,
      data: {
        message: message
      }
    })
    .beforeClose();
  }

  openAlertDialog(message: string, width: string = '300px'): Observable<any> {
    return this.dialog.open(AlertComponent, {
      width: width,
      data: {
        message: message
      }
    }).beforeClose();
  }

  openCongratulationDialog(player: Player) {
    return this.dialog.open(CongratulationDialogComponent, {
      width: '450px',
      data: {
        player: player
      }
    });
  }

}
