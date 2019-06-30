import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from '../modules/material.module';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { AlertComponent } from './dialogs/alert/alert.component';
import { TargetFieldValidator } from '../validators/target-field.validator';
import { UniqueFieldValueValidator } from '../validators/unique-field-value.validator';


@NgModule({
  declarations: [
    NavComponent,
    ConfirmDialogComponent,
    TargetFieldValidator,
    UniqueFieldValueValidator,
    AlertComponent
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
    TargetFieldValidator,
    UniqueFieldValueValidator,
    AlertComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AlertComponent
  ]
})
export class BaseComponentsModule { }
