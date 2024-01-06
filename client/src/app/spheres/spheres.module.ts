import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpherePageComponent } from './sphere-page/sphere-page.component';
import { SphereComponent } from './sphere/sphere.component';
import { StoreModule } from '@ngrx/store';
import { initialState, spherePageReducer } from './sphere.reducer';
import { SphereFeature, SphereFeatureState, SpherePageState } from './sphere.state';



@NgModule({
  declarations: [
    SpherePageComponent,
    SphereComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature<SphereFeatureState>(SphereFeature, { spherePageState: spherePageReducer }),
  ],
  exports: [
    SpherePageComponent,
  ]
})
export class SpheresModule { }
