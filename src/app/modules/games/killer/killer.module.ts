import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KillerRoutingModule } from './killer-routing.module';
import { GamePanelComponent } from './game-panel/game-panel.component';
import { BaseComponentsModule } from 'src/app/shared/components/base-components.module';
import { GameBaseModule } from '../game-base/game-base.module';
import { TargetSelectComponent } from './target-select/target-select.component';
import { TargetComponent } from './target/target.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { GameComponent } from './game/game.component';
import { HitsCounterComponent } from './hits-counter/hits-counter.component';
import { FormatComponent } from './format/format.component';
import { ReactivaComponent } from './reactiva/reactiva.component';
import { TargetSelectionComponent } from './target-selection/target-selection.component';


@NgModule({
  declarations: [
    GamePanelComponent,
    TargetSelectComponent,
    TargetComponent,
    GameComponent,
    HitsCounterComponent,
    FormatComponent,
    ReactivaComponent,
    TargetSelectionComponent
  ],
  imports: [
    CommonModule,
    KillerRoutingModule,
    GameBaseModule,
    MaterialModule,
    BaseComponentsModule
  ]
})
export class KillerModule { }
