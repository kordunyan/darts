import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { KillerComponent } from './killer/killer.component';
import { MaterialModule } from '../modules/material.module';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    NavComponent,
    KillerComponent,
    ConfirmDialogComponent
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
    KillerComponent,
    RouterModule,
    FormsModule,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent  
  ]
})
export class BaseComponentsModule { }
