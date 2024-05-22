import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpherePageComponent } from './sphere-page/sphere-page.component';

const routes: Routes = [
    { path: '', component: SpherePageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SpheresRoutingModule { }