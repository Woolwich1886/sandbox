import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-sphere',
  templateUrl: './sphere.component.html',
  styleUrl: './sphere.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SphereComponent implements OnInit {

  @Input()
  color?: string;

  @Input()
  number?: number;

  backgroundStyle?: Record<string, string>;

  ngOnInit(): void {
    this.backgroundStyle = {
      'background': `radial-gradient(closest-corner at 40% 40%, white, ${this.color})`,
      'box-shadow': `2px 2px 4px 1px ${this.color}`,
    };
  }

}
