import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpheresModule } from './spheres/spheres.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { MessengerModule } from './messenger/messenger.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpheresModule,
    SharedModule,
    MaterialModule,
    MessengerModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'HH:mm, dd.MM.yyyy' } }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
