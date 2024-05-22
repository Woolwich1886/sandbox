import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconRegistyService } from '../../material/icon-registry.service';

interface NavPanelElement {
  label: string;
  icon: string;
  navigate: () => void;
}

@Component({
  selector: 'sb-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrl: './nav-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavPanelComponent {

  readonly navElements: NavPanelElement[] = [
    { label: 'Главная', icon: 'home', navigate: () => this.toHome() },
    { label: 'Код проекта на GitHub', icon: 'code', navigate: () => this.toSource() }
  ];

  constructor(private router: Router, private icon: IconRegistyService) {
  }

  toHome(): void {
    this.router.navigate(['']);
  }

  toSource(): void {
    this.router.navigateByUrl('https://github.com/Woolwich1886/sandbox');
  }
}
