import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MessageComponent } from '../messenger/message/message.component';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { InputComponent } from './input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ChatPreviewComponent } from '../messenger/chat-preview/chat-preview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { UserSelectionDialogComponent } from './user-selection-dialog/user-selection-dialog.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CardComponent,
    MessageComponent,
    InputComponent,
    ChatPreviewComponent,
    UserSelectionDialogComponent,
  ],
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
    CardComponent,
    MatDivider,
    MessageComponent,
    MatIcon,
    InputComponent,
    ChatPreviewComponent,
    DialogModule,
    UserSelectionDialogComponent,
  ]
})
export class MaterialModule { }
