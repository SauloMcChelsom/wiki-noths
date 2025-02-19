import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ThemeCacheService } from '@domain/change-theme/caches/theme.cache';
import { eThemeMode, eThemeUI } from '@domain/change-theme/enums/theme.enum';
import { iTheme } from '@domain/change-theme/interfaces/theme.interface';
import { ThemeService } from '@domain/change-theme/services/theme.service';
import { ButtonToggleGroupComponent } from '@widget/components/button-toggle/button-toggle.component';
import { ButtonToggleLabelComponent } from '@widget/components/button-toggle/component/button-toggle-label/button-toggle-label.component';
import { ButtonToggleLabelStyleWidthFullDirective } from '@widget/components/button-toggle/directive/button-toggle-label-style.directive';
import { take } from 'rxjs';

@Component({
  selector: 'app-mode-theme-flip',
  templateUrl: './mode-theme-flip.component.html',
  styleUrls: ['./mode-theme-flip.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ButtonToggleGroupComponent,
    ButtonToggleLabelComponent,
    ButtonToggleLabelStyleWidthFullDirective,
  ],
  providers: [ThemeService, ThemeCacheService],
})
export class ModeThemeFlipComponent implements OnInit {
  private renderer: Renderer2 = inject(Renderer2);
  public control = new FormControl<string | undefined>('');
  private theme: ThemeService = inject(ThemeService);
  protected typeTheme = '';

  public ngOnInit(): void {
    this.theme.getTheme().subscribe((theme: iTheme[]) => {
      if (theme == undefined) {
        return;
      }
      if (theme.length == 0) {
        return;
      }
      if (theme[0].mode == eThemeMode.DARK) {
        this.typeTheme = 'dark';
        this.renderer.removeClass(document.body, 'light');
        this.renderer.addClass(document.body, 'dark');
        return;
      }
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.addClass(document.body, 'light');
      this.typeTheme = 'light';
    });
  }

  public onSingleSelectionChange(value: any): void {
    const isDark = value.length == 1 ? true : false;

    if (isDark) {
      this.theme
        .updateSaveTheme({
          mode: eThemeMode.DARK,
          theme: eThemeUI.LARANJINHA,
        })
        .pipe(take(1))
        .subscribe({});
      return;
    }

    this.theme
      .updateSaveTheme({
        mode: eThemeMode.LIGHT,
        theme: eThemeUI.LARANJINHA,
      })
      .pipe(take(1))
      .subscribe({});
  }
}
