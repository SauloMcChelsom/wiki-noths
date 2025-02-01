import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-modal',
  template: '',
  standalone: true,
  imports: [CommonModule],
})
export class DialogModalComponent {
  private data = inject<any>(MAT_DIALOG_DATA);
  private dialogRef = inject<MatDialogRef<DialogModalComponent>>(MatDialogRef);

  public close(data?: any): void {
    this.dialogRef.close(data);
  }
}
