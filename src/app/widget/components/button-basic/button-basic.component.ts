import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-basic',
  templateUrl: './button-basic.component.html',
  styleUrls: ['./button-basic.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class ButtonBasicComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public ariaLabel = '';
  @Input() public color = '';
  @Input() public class = '';
  @Input() public isButtonDisabled = false;

  public click(): void {
    this.clickEvent.emit();
  }
}
