import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconSizes } from './models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class IconComponent {
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter();
  @Input() public fontIcon = '';
  @Input() public color!: string;
  @Input() public ariaLabel = '';
  @Input() public size: IconSizes = IconSizes.MEDIUM;
  public IconSizes = IconSizes;

  public click(): void {
    this.clickEvent.emit();
  }
}
