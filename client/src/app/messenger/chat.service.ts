import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { UserInfo } from './model/user-info.model';
import { SERVER } from '../app.config';
import { Observable, map, merge, switchMap, tap } from 'rxjs';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { ChatPreviewInfo } from './model/chat-preview-info.model';
import { Message } from './model/message.model';

@Injectable()
export class ChatService implements OnDestroy {

  private stomp: RxStomp;

  constructor(private http: HttpClient) {
    const config = new RxStompConfig();
    config.brokerURL = 'ws://127.0.0.1:8080/socket';
    config.debug = console.log;
    this.stomp = new RxStomp();
    this.stomp.configure(config);
    this.stomp.activate();
  }

  ngOnDestroy(): void {
    this.stomp.deactivate();
  }

  getUserChatInfo(id: number): Observable<UserInfo> {
    return this.http.request<UserInfo>('GET', SERVER + `/rest/users/${id}/info`);
  }

  getChatList(id: number): Observable<ChatPreviewInfo[]> {
    return this.http.request<ChatPreviewInfo[]>('GET', SERVER + `/rest/users/${id}/chat-list`);
  }

  getMessages(id: number): Observable<Message[]> {
    return this.http.request<Message[]>('GET', SERVER + `/rest/chat/${id}/messages`);
  }

  sendMessage(dto: Message, id: number): void {
    this.stomp.publish({ destination: `/app/chat/${id}`, body: JSON.stringify(dto) });
  }

  loadMessage(id: number): Observable<Message> {
    return this.stomp
      .watch({ destination: `/topic/chat/${id}` })
      .pipe(map(message => JSON.parse(message.body) as Message));
  }

  updateChatList(id: number): Observable<ChatPreviewInfo> {
    return this.stomp
      .watch({ destination: `/topic/user/${id}/chat-list` })
      .pipe(map(message => JSON.parse(message.body) as ChatPreviewInfo));
  }

}
