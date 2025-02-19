import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.layout.html',
  styleUrls: ['./change-theme.layout.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ChangeThemeLayout {}
