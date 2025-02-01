import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-cool',
  templateUrl: './item-cool.component.html',
  styleUrls: ['./item-cool.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
})
export class ItemCoolComponent {
  @Input() public routerLink!: string;
  @Input() public text!: string;
}
