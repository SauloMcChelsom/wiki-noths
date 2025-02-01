import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class ButtonFormComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public label!: string;
  @Input() public icon!: string;
  @Input() public load = false;

  public click(): void {
    this.clickEvent.emit();
  }
}
