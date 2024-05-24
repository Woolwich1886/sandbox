import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from '../../shared/device.service';

@Component({
  selector: 'sb-sphere-help-dialog',
  templateUrl: './sphere-help-dialog.component.html',
  styleUrl: './sphere-help-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SphereHelpDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SphereHelpDialogComponent, void>,
    public deviceService: DeviceService,
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }
}
