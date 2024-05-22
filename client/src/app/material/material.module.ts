import { DialogModule } from '@angular/cdk/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    TextFieldModule,
    MatDialogModule,
    MatRippleModule,
  ],
  exports: [
    MatDivider,
    MatIcon,
    DialogModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule { }
