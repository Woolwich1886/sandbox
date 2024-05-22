import { Injectable } from '@angular/core';
import { NavCard } from './nav-card.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { SERVER } from '../app.config';
import { UserInfo } from '../messenger/model/user-info.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { UserSelectionDialogComponent } from '../shared/user-selection-dialog/user-selection-dialog.component';

@Injectable({ providedIn: 'root' })
export class MainPageService {

  constructor(private httpClient: HttpClient, private router: Router, private dialog: MatDialog) { }

  getNavs(): NavCard[] {
    return [
      {
        label: 'Сферы',
        description: 'Небольшая игра с переключателями, которые генерируют цветные шары.',
        navigateCallback: () => this.callbackSphere()
      },
      {
        label: 'Мессенджер',
        description: 'Мини-чат, можно выбрать двух разных пользователей и пообщаться.',
        navigateCallback: () => this.callbackMessenger()
      },
    ];
  }

  private callbackSphere(): void {
    this.router.navigateByUrl('spheres');
  }

  private callbackMessenger(): void {
    lastValueFrom(this.httpClient.request<UserInfo[]>('GET', SERVER + '/rest/users'))
      .then(data => this.dialog.open(UserSelectionDialogComponent, { data }))
      .then(ref => firstValueFrom(ref.afterClosed())
        .then(id => {
          if (id) {
            this.router.navigateByUrl(`messenger/user/${id}/chat`);
          }
        }));
  }

}
