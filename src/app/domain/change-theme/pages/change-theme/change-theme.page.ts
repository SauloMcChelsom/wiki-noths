import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModeThemeFlipComponent } from '@domain/change-theme/components/mode-theme-flip/mode-theme-flip.component';
import { ModeThemeComponent } from '@domain/change-theme/components/mode-theme/mode-theme.component';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.page.html',
  styleUrls: ['./change-theme.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ModeThemeFlipComponent,
    ModeThemeComponent
  ],
})
export class ChangeThemePage { }
