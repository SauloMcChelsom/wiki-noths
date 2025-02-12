import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { aStoreState } from '@core/infra/store/abstracts/store-state.abstract';
import { aStore } from '@core/infra/store/abstracts/store.abstract';
import { StoreService } from '@core/infra/store/services/store.service';
import { LanguageCacheService } from '@domain/internationalization/caches/language.cache';
import { iSelection } from '@domain/internationalization/interfaces/language.interface';
import { LanguageMockservice } from '@domain/internationalization/mocks/language.mock';
import { aLanguage } from '@domain/internationalization/abstracts/language.abstract';
import { LanguageService } from '@domain/internationalization/services/language.service';
import { TranslationService } from '@domain/internationalization/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectOptionComponent } from '@widget/components/select-option/select-option.component';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
  standalone: true,
  imports: [CommonModule, SelectOptionComponent, TranslateModule],
  providers: [
    {
      provide: aStore,
      useClass: StoreService,
    },
    {
      provide: aStoreState,
      useClass: LanguageCacheService
    },
    {
      provide: aLanguage,
      useClass: LanguageMockservice,
    },
    LanguageService,
    TranslationService,
    TranslateService,
  ],
})
export class ChangeLanguagePage implements OnInit {
  public formControl = new FormControl('');
  public selectEmpy = this.translate.instant('NOTE.OPTION_EMPY');
  public default = this.translationService.getDefaultLang();
  public selections: iSelection[] = [];

  public constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
    private lang: LanguageService
  ) { }

  public ngOnInit(): void {
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
