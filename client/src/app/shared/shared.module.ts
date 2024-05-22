import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPanelComponent } from './nav-panel/nav-panel.component';
import { RouterModule } from '@angular/router';
import { UserSelectionDialogComponent } from './user-selection-dialog/user-selection-dialog.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    UserSelectionDialogComponent,
    NavPanelComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    UserSelectionDialogComponent,
    NavPanelComponent,
    CardComponent,
  ]
})
export class SharedModule { }
