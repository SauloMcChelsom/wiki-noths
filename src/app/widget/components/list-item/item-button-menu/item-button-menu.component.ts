import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-button-menu',
  templateUrl: './item-button-menu.component.html',
  styleUrls: ['./item-button-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
})
export class ItemButtonMenuComponent {
  @Input() public routerLink!: string;
  @Input() public text!: string;
}
