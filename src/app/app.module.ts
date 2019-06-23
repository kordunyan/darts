import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';
import { BaseComponentsModule } from './shared/components/base-components.module';
import { HomeComponent } from './modules/home/home.component';
import { KillerModule } from './modules/games/killer/killer.module';
import { GameBaseModule } from './modules/games/game-base/game-base.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BaseComponentsModule,
    KillerModule,
    GameBaseModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
