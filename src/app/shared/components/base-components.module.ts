import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from '../modules/material.module';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from './dialogs/alert/alert.component';
import { CongratulationDialogComponent } from './dialogs/congratulation-dialog/congratulation-dialog.component';


@NgModule({
  declarations: [
    NavComponent,
    ConfirmDialogComponent,
    AlertComponent,
    CongratulationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    NavComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    AlertComponent,
    CongratulationDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AlertComponent,
    CongratulationDialogComponent
  ]
})
export class BaseComponentsModule { }
