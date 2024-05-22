import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { SpherePageComponent } from './sphere-page/sphere-page.component';
import { spherePageReducer } from './sphere.reducer';
import { SphereFeature, SphereFeatureState } from './sphere.state';
import { SphereComponent } from './sphere/sphere.component';
import { SpheresRoutingModule } from './spheres-routing.module';
import { MaterialModule } from '../material/material.module';
import { SphereHelpDialogComponent } from './sphere-help-dialog/sphere-help-dialog.component';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { SphereChartComponent } from './sphere-chart/sphere-chart.component';



@NgModule({
  declarations: [
    SpherePageComponent,
    SphereComponent,
    SphereHelpDialogComponent,
    SphereChartComponent,
  ],
  imports: [
    SpheresRoutingModule,
    CommonModule,
    StoreModule.forFeature<SphereFeatureState>(SphereFeature, { spherePageState: spherePageReducer }),
    MaterialModule,
    NgxEchartsDirective,
  ],
  exports: [
    SpherePageComponent,
  ],
  providers: [
    provideEcharts(),
  ],
})
export class SpheresModule { }
