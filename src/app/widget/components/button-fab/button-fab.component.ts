import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-fab',
  templateUrl: './button-fab.component.html',
  styleUrls: ['./button-fab.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
})
export class ButtonFabComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public icon = '';
  @Input() public routerLink!: string;
  @Input() public color = 'primary';
  @Input() public ariaLabel!: string;

  public click(): void {
    this.clickEvent.emit();
  }
}
