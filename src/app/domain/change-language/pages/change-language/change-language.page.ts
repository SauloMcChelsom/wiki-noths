import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from '@core/infra/store/services/store.service';
import { LanguageCacheService } from '@domain/change-language/caches/language.cache';
import { iSelection } from '@domain/change-language/interfaces/language.interface';
import { LanguageMockservice } from '@domain/change-language/mocks/language.mock';
import { LanguageService } from '@domain/change-language/services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectOptionComponent } from '@widget/components/select-option/select-option.component';
import { LanguageTranslatorService } from '@domain/change-language/services/language-translator.service';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
  standalone: true,
  imports: [CommonModule, SelectOptionComponent, TranslateModule],
  providers: [
    StoreService,
    LanguageCacheService,
    LanguageMockservice,
    LanguageService,
    LanguageTranslatorService,
    TranslateService,
  ],
})
export class ChangeLanguagePage implements OnInit {
  public formControl = new FormControl('');
  public selectEmpy = '';
  public default = '';
  public selections: iSelection[] = [];
  private translationService: LanguageTranslatorService = inject(
    LanguageTranslatorService
  );
  private translate: TranslateService = inject(TranslateService);
  private lang: LanguageService = inject(LanguageService);

  public ngOnInit(): void {
    this.selectEmpy = this.translate.instant('NOTE.OPTION_EMPY');
    this.default = this.translationService.getDefaultLang();

    this.formControl.setValue(this.default);
    this.lang.getAllLanguage().subscribe((res) => {
      res.forEach((value) => {
        this.selections.push({
          description: value.language,
          cod: value.prefix,
        });
      });
    });
  }

  public selected($event: string) {
    this.translationService.changeLang($event);
  }
}
