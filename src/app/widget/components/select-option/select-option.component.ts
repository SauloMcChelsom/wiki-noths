import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SelectionModel } from './models';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SelectOptionComponent implements OnInit {
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public formControl!: FormControl<any>;
  @Input() public placeholder!: string;
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Input() public options!: SelectionModel[];

  private initialControlValue: any;
  private initialDisabledState!: boolean;
  private initialValidator: any;

  public ngOnInit(): void {
    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;
    this.initialValidator = this.isRequired ? Validators.required : null;

    this.applyRequiredValidator(this.isRequired);
    this.applyDisabledState(this.isDisabled);
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

  protected click(cod: string) {
    this.clickEvent.emit(cod);
  }
}
