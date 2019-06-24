import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePanelComponent } from './game-panel/game-panel.component';
import { TargetSelectComponent } from './target-select/target-select.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {
    path: 'killer',
    component: GamePanelComponent,
    children: [
      {
        path: 'targets',
        component: TargetSelectComponent
      },
      {
        path: 'game',
        component: GameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KillerRoutingModule { }
