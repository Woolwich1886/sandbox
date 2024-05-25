import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom, map } from 'rxjs';
import { ChatService } from './chat.service';
import { DeselectChat, SelectChat } from './messenger.action';
import { MessengerState, selectChatList, selectCurrentUser, selectMessengerState } from './messenger.state';
import { ChatPreviewInfo } from './model/chat-preview-info.model';
import { Message } from './model/message.model';
import { UserInfo } from './model/user-info.model';

@Injectable()
export class MessengerPageService implements OnDestroy {

  constructor(private store: Store<MessengerState>, private router: Router, private route: ActivatedRoute, private service: ChatService) {
    this.service.activate();
  }

  ngOnDestroy(): void {
    this.service.deactivate();
  }

  getUserChatList(): Observable<ChatPreviewInfo[]> {
    return this.store.select(selectChatList);
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.store.select(selectCurrentUser);
  }

  selectChat(chatId: number): void {
    this.store.dispatch(SelectChat(chatId));
  }

  getMessages(): Observable<Message[]> {
    return this.store.select(selectMessengerState).pipe(map(info => info.messages));
  }

  getChatUser(): Observable<UserInfo | undefined> {
    return this.store.select(selectMessengerState).pipe(map((info: MessengerState) => info.chatList.find(c => c.id === info.selectedChatId)?.user));
  }

  isChatSelected(): Observable<boolean> {
    return this.store.select(selectMessengerState).pipe(map(info => !!info.selectedChatId));
  }

  sendMessage(content: string): void {
    firstValueFrom(this.store.select(selectMessengerState))
      .then(info => this.service.sendMessage({ author: info.currentUser, content } satisfies Message, info.selectedChatId!));
  }

  clearSelectedChat(): void {
    this.store.dispatch(DeselectChat());
  }
}
