import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RadioModel } from './models';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    CommonModule,
  ],
})
export class RadioComponent implements OnInit {
  @Input() public options: RadioModel[] = [];
  @Input() public formControl!: FormControl;
  @Input() public initialSelection = '';
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();
  private initialControlValue: any;
  private initialDisabledState!: boolean;
  private initialValidator: any;

  public ngOnInit(): void {
    if (!this.formControl.value && this.initialSelection) {
      this.formControl.setValue(this.initialSelection);
    }

    this.initialControlValue = this.formControl.value;
    this.initialDisabledState = this.isDisabled;
    this.initialValidator = this.isRequired ? Validators.required : null;

    this.applyDisabledState(this.isDisabled);
    this.applyRequiredValidator(this.isRequired);
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
