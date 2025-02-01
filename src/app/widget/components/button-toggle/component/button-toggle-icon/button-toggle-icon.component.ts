import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleOptionModel } from '../../models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-toggle-icon',
  templateUrl: './button-toggle-icon.component.html',
  styleUrls: ['./button-toggle-icon.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule, MatIconModule],
})
export class ButtonToggleIconComponent {
  @Input() public options: ToggleOptionModel[] = [];
}
