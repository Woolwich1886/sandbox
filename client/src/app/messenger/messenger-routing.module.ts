import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerPageComponent } from './messenger-page/messenger-page-component';

const routes: Routes = [
    { path: 'user/:id/chat', component: MessengerPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MessengerRoutingModule { }