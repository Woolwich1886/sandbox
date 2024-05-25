import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, map, withLatestFrom } from 'rxjs';
import { MessengerPageService } from '../messenger-page.service';
import { Message } from '../model/message.model';
import { UserInfo } from '../model/user-info.model';
import { DeviceService } from '../../shared/device.service';

interface AuthorsMessage extends Message {
  isAuthor: boolean;
}

@Component({
  selector: 'sb-chat-messages-container',
  templateUrl: './chat-messages-container-component.html',
  styleUrl: './chat-messages-container-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesContainerComponent implements AfterViewChecked {

  @ViewChild('messagesContainer', { static: false })
  messagesContainer?: ElementRef;

  currentUser$: Observable<UserInfo>;
  messages$: Observable<AuthorsMessage[]>;
  chatUser$: Observable<UserInfo | undefined>;

  constructor(public service: MessengerPageService, public deviceService: DeviceService) {
    this.currentUser$ = service.getCurrentUser();
    this.messages$ = service.getMessages().pipe(
      withLatestFrom(this.currentUser$),
      map(([messages, info]) => messages.map(message => modifyMessage(message, info.id)))
    );
    this.chatUser$ = service.getChatUser();
  }

  ngAfterViewChecked(): void {
    const div: HTMLDivElement = this.messagesContainer?.nativeElement;
    div?.parentElement?.scrollTo({ top: div.offsetHeight });
  }
}

function modifyMessage(message: Message, currentUserId: number): AuthorsMessage {
  return { ...message, isAuthor: message.author.id === currentUserId };
}
