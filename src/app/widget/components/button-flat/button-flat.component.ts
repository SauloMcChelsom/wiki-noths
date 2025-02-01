import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-button-flat',
  templateUrl: './button-flat.component.html',
  styleUrls: ['./button-flat.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class ButtonFlatComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public ariaLabel = '';
  @Input() public color = '';
  @Input() public class = '';
  @Input() public isButtonDisabled = false;

  public click(): void {
    this.clickEvent.emit();
  }
}
