import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

enum DeviceType {
  Unknown = 'Unknown',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
  Web = 'Web',
}

//https://medium.com/geekculture/how-to-make-responsive-design-in-angular-1ad9d936dc16
@Injectable({ providedIn: 'root' })
export class DeviceService implements OnDestroy {

  private deviceType = DeviceType.Unknown;
  private readonly sub: Subscription;
  private readonly breakpoints = [Breakpoints.Web, Breakpoints.Handset, Breakpoints.Tablet];
  private readonly deviceMap: Map<string, DeviceType> = new Map([
    [Breakpoints.WebLandscape, DeviceType.Web],
    [Breakpoints.WebPortrait, DeviceType.Web],
    [Breakpoints.TabletPortrait, DeviceType.Tablet],
    [Breakpoints.TabletLandscape, DeviceType.Tablet],
    [Breakpoints.HandsetPortrait, DeviceType.Mobile],
    [Breakpoints.HandsetLandscape, DeviceType.Mobile],
  ]);


  constructor(breakpointObserver: BreakpointObserver) {
    this.sub = breakpointObserver.observe(this.breakpoints).subscribe(result => {
      for (const key of Object.keys(result.breakpoints)) {
        if (result.breakpoints[key]) {
          this.deviceType = this.deviceMap.get(key) ?? DeviceType.Unknown;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public isDeviceDesktop(): boolean {
    return this.deviceType === DeviceType.Web;
  }
  public isDeviceTablet(): boolean {
    return this.deviceType === DeviceType.Tablet;
  }
  public isDeviceMobile(): boolean {
    return this.deviceType === DeviceType.Mobile;
  }

}
