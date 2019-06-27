import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {filter} from 'rxjs/operators';
import { PlayerNameDialogComponent } from '../modules/games/game-base/player-name-dialog/player-name-dialog.component';
 import { ConfirmDialogComponent } from '../shared/components/dialogs/confirm-dialog/confirm-dialog.component';



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

  openConfirmDialog(message: string): Observable<any> {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: message
      }
    })
    .beforeClose();
  }

  // openAlertDialog(message: string): Observable<any> {
  //   return this.dialog.open(AlertComponent, {
  //     width: '300px',
  //     data: {
  //       message: message
  //     }
  //   });
  // }

}
