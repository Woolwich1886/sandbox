import { NgModule } from '@angular/core';
import { SocketMainPageComponent } from './messenger-page/messenger-page';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatMessagesContainer } from './chat-messages-container/chat-messages-container';
import { RouterModule } from '@angular/router';
import { MessagerFeature, MessengerFeatureState } from './messenger.state';
import { messengerReducer } from './messenger.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessengerEffects } from './messenger.effects';
import { ChatService } from './chat.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    SocketMainPageComponent,
    ChatMessagesContainer,
  ],
  imports: [
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
