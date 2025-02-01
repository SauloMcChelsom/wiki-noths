import { Component, inject, Input } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-snackbar-position',
  template: '',
  styleUrls: ['./snack-bar-position.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class SnackBarPositionComponent {
  @Input() public horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  @Input() public verticalPosition: MatSnackBarVerticalPosition = 'top';
  private _snackBar = inject(MatSnackBar);

  public openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
