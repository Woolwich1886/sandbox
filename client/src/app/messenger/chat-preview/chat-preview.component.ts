import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Message } from '../model/message.model';
import { UserInfo } from '../model/user-info.model';

@Component({
  selector: 'sb-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrl: './chat-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPreviewComponent {

  @HostBinding('class.active')
  @Input()
  isActive = false;

  @Input()
  isAuthor = false;

  @Input()
  user?: UserInfo;

  @Input()
  lastMessage?: Message;

  @Output()
  choose: EventEmitter<void> = new EventEmitter();

  onClick(): void {
    this.choose.emit();
  }
}
