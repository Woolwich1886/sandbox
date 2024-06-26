import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpherePageService } from '../sphere-page.service';
import { AdvancedSphereColor, SphereColor, SphereModel } from '../model/sphere.model';
import { DeviceService } from '../../shared/device.service';

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
  readonly colorCount$: Observable<Record<AdvancedSphereColor, number>>;
  readonly log$: Observable<string[]>;
  readonly isColorOn: Record<SphereColor, Observable<boolean>>;

  constructor(public service: SpherePageService, public deviceService: DeviceService) {
    this.sphereList$ = this.service.getSpheres();
    this.colorCount$ = this.service.getColorCount();
    const colors: SphereColor[] = ['red', 'blue', 'green'];
    this.isColorOn = colors.reduce((rec, color) => (
      rec[color] = this.service.getColorIsOn(color), rec
    ), {} as Record<SphereColor, Observable<boolean>>);
    this.log$ = this.service.getLog();
  }

}
