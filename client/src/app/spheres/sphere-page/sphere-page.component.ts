import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SphereModel } from '../sphere.model';
import { Observable, distinctUntilChanged, filter, interval, of, switchMap, tap, timer } from 'rxjs';
import { SpherePageService } from '../sphere-page.service';

@Component({
  selector: 'sb-sphere-page',
  templateUrl: './sphere-page.component.html',
  styleUrl: './sphere-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SpherePageService,
  ]
})
export class SpherePageComponent {

  readonly sphereList$: Observable<SphereModel[]>;
  readonly redCount$: Observable<number>;
  readonly blueCount$: Observable<number>;
  readonly greenCount$: Observable<number>;
  readonly violetCount$: Observable<number>;
  readonly whiteCount$: Observable<number>;

  constructor(public service: SpherePageService) {
    this.sphereList$ = this.service.getSpheres();
    this.redCount$ = this.service.getColorCount('red');
    this.blueCount$ = this.service.getColorCount('blue');
    this.greenCount$ = this.service.getColorCount('green');
    this.violetCount$ = this.service.getColorCount('violet');
    this.whiteCount$ = this.service.getColorCount('white');
  }

}
