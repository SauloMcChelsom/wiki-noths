import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navlist-column',
  templateUrl: './nav-list-column.component.html',
  styleUrls: ['./nav-list-column.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class NavListColumnComponent {}
