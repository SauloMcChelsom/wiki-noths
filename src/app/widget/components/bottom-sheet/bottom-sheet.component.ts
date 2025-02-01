import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  standalone: true,
  imports: [CommonModule, MatBottomSheetModule],
})
export class BottomSheetComponent {
  public data = inject(MAT_BOTTOM_SHEET_DATA, { optional: true }) as {
    component: any;
  } | null;
}
