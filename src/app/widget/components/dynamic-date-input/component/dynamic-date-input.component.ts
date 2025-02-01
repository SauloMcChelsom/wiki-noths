import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import 'moment/locale/pt-br';
import moment from 'moment';
import {
  FORMAT_MONTH_AND_YEAR,
  FORMAT_YEAR_AND_MONTH,
} from '../constants/dynamic-date-input.constants';
import { CommonModule } from '@angular/common';
import { startViewCalendar } from '../enuns/dynamic-date-input.enum';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskModule } from 'ngx-mask';
import { InputMaskModule } from '@ngneat/input-mask';

@Component({
  selector: 'app-dynamic-date',
  templateUrl: './dynamic-date-input.component.html',
  styleUrls: ['./dynamic-date-input.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgxMaskModule,
    MatNativeDateModule,
    InputMaskModule,
  ],
})
export class DynamicDateInputComponent implements OnInit, AfterViewInit {
  @Input() public editStyle!: string;
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Input() public mask!: string;
  @Input() public minDate: Date | undefined = undefined;
  @Input() public maxDate: Date | undefined = undefined;
  @Input() public formControl!: FormControl<any>;
  @Input() public showHint = false;
  @Input() public locale!: string;
  @Input() public requiredField = false;
  @Input() public title?: string;
  @Input() public placeholder?: string;
  @Input() public prefix?: string;
  @ViewChild('dateInput') public dateInput!: ElementRef<HTMLInputElement>;
  private initialControlValue: any;
  private initialDisabledState!: boolean;
  private initialValidator: any;
  private _locale = inject<string>(MAT_DATE_LOCALE);
  private _formats = inject<MatDateFormats>(MAT_DATE_FORMATS);
  private _adapter = inject(DateAdapter<any>);

  public ngOnInit(): void {
    this.insertTranslationInCalendar();
    this.insertMaskInTheField();

    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;
    this.initialValidator = this.isRequired ? Validators.required : null;

    this.applyRequiredValidator(this.isRequired);
    this.applyDisabledState(this.isDisabled);
    this.setRequired(this.requiredField);
  }

  public insertTranslationInCalendar() {
    this._locale = this.locale!;
    this._adapter.setLocale(this._locale);
  }

  public insertMaskInTheField() {
    const DATE_FORMAT = this.mask.toUpperCase();
    this._formats.parse.dateInput = DATE_FORMAT;
    this._formats.display.dateInput = DATE_FORMAT;
  }

  public fieldIsRequired(): boolean {
    return this.requiredField;
  }

  public setRequired(checked: boolean): void {
    if (checked) {
      this.formControl?.addValidators(Validators.required);
    } else {
      this.formControl?.removeValidators(Validators.required);
    }
  }

  public ngAfterViewInit(): void {
    this._locale = this.locale!;
    Inputmask('datetime', {
      inputFormat: this.mask,
      placeholder: this.mask.toUpperCase(),
      alias: 'datetime',
      clearMaskOnLostFocus: true,
    }).mask(this.dateInput.nativeElement);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this.formControl?.setValue(value);
  }

  public get TYPE_CALENDA(): any {
    if (
      this.mask == FORMAT_MONTH_AND_YEAR ||
      this.mask == FORMAT_YEAR_AND_MONTH
    ) {
      return startViewCalendar.MULTI_YEAR;
    }
    return startViewCalendar.MONTH;
  }

  public setMonthAndYear(
    normalizedMonthAndYear: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    if (
      this.mask !== FORMAT_MONTH_AND_YEAR &&
      this.mask !== FORMAT_YEAR_AND_MONTH
    ) {
      return;
    }

    const date = new FormControl(moment());
    const ctrlValue = date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    date.setValue(ctrlValue);
    this.formControl.setValue(date.value);
    datepicker.close();
  }

  public resetToInitialState(): void {
    this.formControl.patchValue(this.initialControlValue);
    this.applyRequiredValidator(this.initialValidator !== null);
    this.applyDisabledState(this.initialDisabledState);
    this.formControl.markAsUntouched();
    this.formControl.updateValueAndValidity();
  }

  public enable(): void {
    this.formControl.enable();
  }

  public disable(): void {
    this.formControl.disable();
  }

  private applyDisabledState(shouldDisable: boolean): void {
    shouldDisable ? this.disable() : this.enable();
  }

  private applyRequiredValidator(isRequired: boolean): void {
    if (isRequired) {
      this.formControl.setValidators(Validators.required);
    } else {
      this.formControl.clearValidators();
    }
    this.formControl.updateValueAndValidity();
  }
}
