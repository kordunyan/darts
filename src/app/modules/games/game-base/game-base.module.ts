import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { PlayerNameDialogComponent } from './player-name-dialog/player-name-dialog.component';
import { BaseComponentsModule } from 'src/app/shared/components/base-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PlayerNameComponent } from './player-name/player-name.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    PlayerRegistrationComponent,
    PlayerNameDialogComponent,
    PlayerNameComponent,
    CounterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BaseComponentsModule
  ],
  exports: [
    PlayerRegistrationComponent,
    PlayerNameDialogComponent,
    PlayerNameComponent,
    CounterComponent
  ],
  entryComponents: [
    PlayerNameDialogComponent  
  ]
})
export class GameBaseModule { }
