import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
})
export class ButtonIconComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public icon = '';
  @Input() public routerLink!: string;
  @Input() public ariaLabel = '';

  public click(): void {
    this.clickEvent.emit();
  }
}
