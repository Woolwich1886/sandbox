import { Injectable, OnDestroy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { MessengerState, selectChatState } from './messenger.state';
import { ChatPreviewInfo } from './model/chat-preview-info.model';
import { UserInfo } from './model/user-info.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Message } from './model/message.model';
import { SelectChat } from './messenger.action';
import { ChatService } from './chat.service';

@Injectable()
export class MessengerPageService implements OnDestroy {

  private stomp: RxStomp;

  constructor(private store: Store<MessengerState>, private router: Router, private route: ActivatedRoute, private service: ChatService) {
    const config = new RxStompConfig();
    config.brokerURL = 'ws://127.0.0.1:8080/socket';
    this.stomp = new RxStomp();
    this.stomp.configure(config);
    this.stomp.activate();
  }

  ngOnDestroy(): void {
    this.stomp.deactivate();
  }

  getUserChatList(): Observable<ChatPreviewInfo[]> {
    return this.store.select(selectChatState).pipe(map(info => info.chatList));
  }

  getCurrentUser(): Observable<UserInfo> {
    return this.store.select(selectChatState).pipe(map(info => info.currentUser));
  }

  selectChat(chatId: number): void {
    this.store.dispatch(SelectChat(chatId));
  }

  getMessages(): Observable<Message[]> {
    return this.store.select(selectChatState).pipe(map(info => info.messages));
  }

  getChatUser(): Observable<UserInfo | undefined> {
    return this.store.select(selectChatState).pipe(map((info: MessengerState) => info.chatList.find(c => c.id === info.selectedChatId)?.user));
  }

  isChatSelected(): Observable<boolean> {
    return this.store.select(selectChatState).pipe(map(info => !!info.selectedChatId));
  }

  sendMessage(content: string): void {
    firstValueFrom(this.store.select(selectChatState))
      .then(info => this.service.sendMessage({ author: info.currentUser, content } satisfies Message, info.selectedChatId!));
  }
}
