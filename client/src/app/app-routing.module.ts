import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'spheres', loadChildren: () => import('./spheres/spheres.module').then(m => m.SpheresModule) },
  { path: 'messenger', loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
