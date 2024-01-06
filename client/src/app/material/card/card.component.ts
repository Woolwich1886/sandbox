import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sb-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  @Input()
  title!: string;

  @Input()
  actionLabel?: string;

  @Output()
  action: EventEmitter<any> = new EventEmitter();

  execute(): void {
    this.action.emit();
  }

}
