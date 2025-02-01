import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-icon-spinner',
  templateUrl: './button-icon-spinner.component.html',
  styleUrls: ['./button-icon-spinner.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ButtonIconSpinnerComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public diameter = '24';
  @Input() public ariaLabel!: string;

  public click(): void {
    this.clickEvent.emit();
  }
}
