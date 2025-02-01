import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonIconComponent } from '../button-icon/button-icon.component';
import { ButtonIconSpinnerComponent } from '../button-icon-spinner/button-icon-spinner.component';

@Component({
  selector: 'app-button-cancat',
  templateUrl: './button-cancat.component.html',
  styleUrls: ['./button-cancat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    ButtonIconComponent,
    ButtonIconSpinnerComponent,
  ],
})
export class ButtonCancatComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public spinner = false;
  @Input() public icon = '';
  @Input() public routerLink!: string;
  @Input() public ariaLabel!: string;
  @Input() public ariaLabelSpinner!: string;

  public click(): void {
    this.clickEvent.emit();
  }
}
