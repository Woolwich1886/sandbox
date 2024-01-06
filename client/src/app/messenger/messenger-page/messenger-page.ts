import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { ChatPreviewInfo } from '../model/chat-preview-info.model';
import { MessengerPageService } from '../messenger-page.service';
import { UserInfo } from '../model/user-info.model';

@Component({
  selector: 'sb-messenger-page',
  templateUrl: './messenger-page.html',
  styleUrl: './messenger-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessengerPageService]
})
export class SocketMainPageComponent {

  readonly chatList$: Observable<ChatPreviewInfo[]>;
  readonly currentUser$: Observable<UserInfo>;
  readonly isChatSelected$: Observable<boolean>;

  constructor(public service: MessengerPageService) {
    this.chatList$ = service.getUserChatList();
    this.currentUser$ = service.getCurrentUser();
    this.isChatSelected$ = service.isChatSelected();
  }
}
