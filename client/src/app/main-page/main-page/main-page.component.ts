import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageService } from '../main-page.service';
import { NavCard } from '../nav-card.model';

@Component({
  selector: 'sb-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {
  readonly navCards: NavCard[];

  constructor(service: MainPageService) {
    this.navCards = service.getNavs();
  }
}
