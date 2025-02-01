import { CommonModule } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonToggleGroupComponent } from '@widget/components/button-toggle/button-toggle.component';
import { ButtonToggleLabelComponent } from '@widget/components/button-toggle/component/button-toggle-label/button-toggle-label.component';
import { ButtonToggleLabelStyleWidthFullDirective } from '@widget/components/button-toggle/directive/button-toggle-label-style.directive';

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
})
export class ModeThemeFlipComponent {
  private renderer: Renderer2 = inject(Renderer2);
  public control = new FormControl<string | undefined>('');

  public onSingleSelectionChange(value: any): void {
    const isDark = value.length == 1 ? true : false;
    if (isDark) {
      this.renderer.removeClass(document.body, 'light');
      this.renderer.addClass(document.body, 'dark');
      return;
    }

    this.renderer.removeClass(document.body, 'dark');
    this.renderer.addClass(document.body, 'light');
  }
}
