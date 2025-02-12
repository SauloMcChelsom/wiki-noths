import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '@core/theme/angular-material.module';
import { TitleService } from '@domain/internationalization/services/title.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [RouterModule, AngularMaterialModule, TranslateModule],
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  standalone: true,
})
export class AppComponent implements OnInit {
  private renderer = inject(Renderer2);
  private titleService = inject(TitleService);

  public ngOnInit(): void {
    this.titleService.init();
    this.renderer.addClass(document.body, 'laranjinha');
    this.renderer.addClass(document.body, 'dark'); //dark/light
  }
}
