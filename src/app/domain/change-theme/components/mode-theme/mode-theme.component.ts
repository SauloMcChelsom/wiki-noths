import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { eThemeMode, eThemeUI } from '@domain/change-theme/enums/theme.enum';
import { iTheme } from '@domain/change-theme/interfaces/theme.interface';
import { ThemeService } from '@domain/change-theme/services/theme.service';
import { SlideToggleComponent } from '@widget/components/slide-toggle/slide-toggle.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-mode-theme',
  templateUrl: './mode-theme.component.html',
  styleUrls: ['./mode-theme.component.scss'],
  standalone: true,
  imports: [CommonModule, SlideToggleComponent],
})
export class ModeThemeComponent implements OnInit {
  private renderer: Renderer2 = inject(Renderer2);
  private theme: ThemeService = inject(ThemeService);

  public config = {
    formControl: new FormControl(false),
  };

  public ngOnInit(): void {
    this.theme.getTheme().subscribe((theme: iTheme[]) => {
      if (theme == undefined) {
        return;
      }
      if (theme.length == 0) {
        return;
      }
      if (theme[0].mode == eThemeMode.DARK) {
        this.renderer.removeClass(document.body, 'light');
        this.renderer.addClass(document.body, 'dark');
        this.config.formControl.setValue(true);
        return;
      }
      this.renderer.removeClass(document.body, 'dark');
      this.renderer.addClass(document.body, 'light');
      this.config.formControl.setValue(false);
    });
  }

  public onToggleChange(value: boolean) {
    if (value) {
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
