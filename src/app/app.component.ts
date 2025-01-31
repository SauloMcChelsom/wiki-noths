import { Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/theme/angular-material.module';

@Component({
  imports: [RouterModule, AngularMaterialModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
})
export class AppComponent {
  constructor(
    private renderer: Renderer2, 
  ) {
    this.renderer.addClass(document.body, 'laranjinha');
    this.renderer.addClass(document.body, 'dark');//dark/light
  }
}
