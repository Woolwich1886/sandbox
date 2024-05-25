import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MessengerPageService } from '../messenger-page.service';
import { ChatPreviewInfo } from '../model/chat-preview-info.model';
import { UserInfo } from '../model/user-info.model';
import { DeviceService } from '../../shared/device.service';

@Component({
  selector: 'sb-messenger-page',
  templateUrl: './messenger-page-component.html',
  styleUrl: './messenger-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessengerPageService]
})
export class MessengerPageComponent {

  readonly chatList$: Observable<ChatPreviewInfo[]>;
  readonly currentUser$: Observable<UserInfo>;
  readonly isChatSelected$: Observable<boolean>;

  constructor(public service: MessengerPageService, public deviceService: DeviceService) {
    this.chatList$ = service.getUserChatList();
    this.currentUser$ = service.getCurrentUser();
    this.isChatSelected$ = service.isChatSelected();
  }
}
