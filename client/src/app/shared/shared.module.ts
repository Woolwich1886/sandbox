import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPanelComponent } from './nav-panel/nav-panel.component';



@NgModule({
  declarations: [
    NavPanelComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavPanelComponent,
  ]
})
export class SharedModule { }
