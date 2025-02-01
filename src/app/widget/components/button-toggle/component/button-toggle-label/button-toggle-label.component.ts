import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleOptionModel } from '../../models';

@Component({
  selector: 'app-button-toggle-label',
  templateUrl: './button-toggle-label.component.html',
  styleUrls: ['./button-toggle-label.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonToggleModule],
})
export class ButtonToggleLabelComponent {
  @Input() public options: ToggleOptionModel[] = [];
}
