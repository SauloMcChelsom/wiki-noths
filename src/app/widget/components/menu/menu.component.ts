import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  children?: MenuItem[];
  cod: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule],
})
export class MenuComponent {
  @Output() public clickEvent: EventEmitter<string> = new EventEmitter();
  @Input() public mainMenuLabel = 'Menu';
  @Input() public menuItems: MenuItem[] = [];
  @ViewChild('menu', { static: true }) public menu!: MatMenu;

  protected click(cod: string): void {
    this.clickEvent.emit(cod);
  }
}
