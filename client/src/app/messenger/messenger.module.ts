import { NgModule } from '@angular/core';
import { MessengerPageComponent } from './messenger-page/messenger-page-component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatMessagesContainerComponent } from './chat-messages-container/chat-messages-container-component';
import { RouterModule } from '@angular/router';
import { MessagerFeature, MessengerFeatureState } from './messenger.state';
import { messengerReducer } from './messenger.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessengerEffects } from './messenger.effects';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';
import { MessengerRoutingModule } from './messenger-routing.module';
import { ChatPreviewComponent } from './chat-preview/chat-preview.component';
import { InputComponent } from './input/input.component';
import { MessageComponent } from './message/message.component';



@NgModule({
  declarations: [
    MessengerPageComponent,
    ChatMessagesContainerComponent,
    ChatPreviewComponent,
    InputComponent,
    MessageComponent,
  ],
  imports: [
    MessengerRoutingModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    StoreModule.forFeature<MessengerFeatureState>(MessagerFeature, { messengerState: messengerReducer }),
    EffectsModule.forFeature([MessengerEffects]),
  ],
  providers: [
    ChatService
  ]
})
export class MessengerModule { }
