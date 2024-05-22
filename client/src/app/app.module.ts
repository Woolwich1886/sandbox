import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { SpheresModule } from './spheres/spheres.module';

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
    HttpClientModule,
    MaterialModule,
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
