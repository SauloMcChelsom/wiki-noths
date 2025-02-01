import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export enum ProgressBarModeEnum {
  INDETERMINATE = 'indeterminate',
  DETERMINATE = 'determinate',
  QUERY = 'query',
  BUFFER = 'buffer',
}

@Component({
  selector: 'app-progress-bar',
  template: `
    <mat-progress-bar
      [mode]="mode"
      [value]="percentage"
      [bufferValue]="bufferValue"
    ></mat-progress-bar>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
})
export class ProgressBarComponent {
  @Input() public mode: ProgressBarModeEnum = ProgressBarModeEnum.DETERMINATE;
  @Input() public percentage = 0;
  @Input() public bufferValue = 0;
}
