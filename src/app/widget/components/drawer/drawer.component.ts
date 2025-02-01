import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class DrawerComponent implements OnInit {
  @ViewChild('drawer', { static: true }) public drawer!: MatSidenav;
  @ViewChild('drawerContent', { read: ViewContainerRef })
  public drawerContent!: ViewContainerRef;
  public isOpen = false;
  private drawerService = inject(DrawerService);

  public ngOnInit() {
    this.drawerService.setDrawer(this.drawer, this.drawerContent);
  }

  public ngAfterViewInit() {
    this.drawerService.setDrawer(this.drawer, this.drawerContent);
  }

  public closeDrawer() {
    this.drawerService.close();
  }

  public open() {
    this.isOpen = true;
  }

  public close() {
    this.isOpen = false;
  }
}
