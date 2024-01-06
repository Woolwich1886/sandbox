import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInfo } from '../../messenger/model/user-info.model';

@Component({
  selector: 'sb-user-selection-dialog',
  templateUrl: './user-selection-dialog.component.html',
  styleUrl: './user-selection-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectionDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<UserSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo[],
  ) {
  }

  select(id: number): void {
    this.dialogRef.close(id);
  }
}
