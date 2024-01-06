import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { SocketMainPageComponent } from './messenger/messenger-page/messenger-page';
import { SpherePageComponent } from './spheres/sphere-page/sphere-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'spheres', component: SpherePageComponent, loadChildren: () => import('./spheres/spheres.module').then(m => m.SpheresModule) },
  { path: 'messenger/user/:id/chat', component: SocketMainPageComponent, loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
