import { CommonModule } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SlideToggleComponent } from '@widget/components/slide-toggle/slide-toggle.component';

@Component({
  selector: 'app-mode-theme',
  templateUrl: './mode-theme.component.html',
  styleUrls: ['./mode-theme.component.scss'],
  standalone: true,
  imports: [CommonModule, SlideToggleComponent],
})
export class ModeThemeComponent {
  private renderer: Renderer2 = inject(Renderer2);

  public config = {
    formControl: new FormControl(false),
  };

  public onToggleChange(value: boolean) {
    if (value) {
      this.renderer.removeClass(document.body, 'light');
      this.renderer.addClass(document.body, 'dark');
      return;
    }
    this.renderer.removeClass(document.body, 'dark');
    this.renderer.addClass(document.body, 'light');
  }
}
