import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-stroked',
  templateUrl: './button-stroked.component.html',
  styleUrls: ['./button-stroked.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class ButtonStrokedComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public ariaLabel = '';
  @Input() public color = '';
  @Input() public class = '';
  @Input() public isButtonDisabled = false;

  public click(): void {
    this.clickEvent.emit();
  }
}
