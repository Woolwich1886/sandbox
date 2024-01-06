import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'sb-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent {

  @Input()
  content?: string;

  @Input()
  sendOn?: Date;

  @Input()
  author?: string;

  @Output()
  choose: EventEmitter<void> = new EventEmitter();

}