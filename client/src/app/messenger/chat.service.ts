import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import { Observable, map } from 'rxjs';
import { SERVER, SERVERWS } from '../app.config';
import { ChatPreviewInfo } from './model/chat-preview-info.model';
import { Message } from './model/message.model';
import { UserInfo } from './model/user-info.model';

@Injectable()
export class ChatService implements OnDestroy {

  private readonly stomp: RxStomp;

  constructor(private http: HttpClient) {
    const config = new RxStompConfig();
    config.brokerURL = SERVERWS;
    config.debug = console.log;
    this.stomp = new RxStomp();
    this.stomp.configure(config);
  }

  activate(): void {
    this.stomp.activate();

  }

  deactivate(): void {
    this.stomp.deactivate();
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
