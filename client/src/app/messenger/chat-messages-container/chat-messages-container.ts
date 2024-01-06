import { AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, map, tap, withLatestFrom } from 'rxjs';
import { UserInfo } from '../model/user-info.model';
import { Message } from '../model/message.model';
import { MessengerPageService } from '../messenger-page.service';

interface AuthorsMessage extends Message {
  isAuthor: boolean;
}

@Component({
  selector: 'sb-chat-messages-container',
  templateUrl: './chat-messages-container.html',
  styleUrl: './chat-messages-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagesContainer implements AfterViewChecked, OnInit {

  @ViewChild('messagesWrapper', { static: false })
  messagesBlock?: ElementRef;

  currentUser$: Observable<UserInfo>;
  messages$: Observable<AuthorsMessage[]>;
  chatUser$: Observable<UserInfo | undefined>;

  constructor(public service: MessengerPageService) {
    this.currentUser$ = service.getCurrentUser();
    this.messages$ = service.getMessages().pipe(
      withLatestFrom(this.currentUser$),
      map(([messages, info]) => messages.map(message => modifyMessage(message, info.id)))
    );
    this.chatUser$ = service.getChatUser().pipe(tap(console.log));
  }

  ngOnInit(): void {
    //console.log(this.messagesBlock);
  }

  ngAfterViewChecked(): void {
    //console.log(this.messagesBlock);
    const div: HTMLDivElement = this.messagesBlock?.nativeElement;
    div?.parentElement?.scrollTo({ top: div.offsetHeight });
  }
}

function modifyMessage(message: Message, currentUserId: number): AuthorsMessage {
  return { ...message, isAuthor: message.author.id === currentUserId };
}
