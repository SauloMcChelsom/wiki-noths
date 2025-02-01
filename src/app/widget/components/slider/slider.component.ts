import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [MatSliderModule, ReactiveFormsModule],
})
export class SliderComponent {
  @Input() public formControl!: FormControl;
  @Input() public isRequired = false;
  @Input() public isDisabled = false;
  @Input() public min = 0;
  @Input() public max = 100000;
  @Input() public step = 1000;
  @Input() public initialValue = 0;

  public ngOnChanges() {
    if (this.isDisabled) {
      this.disable();
    }

    if (this.isRequired) {
      this.required();
    }

    if (this.initialValue) {
      this.setInitialValue(this.initialValue);
    }
  }

  public formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '';
    }
    return `${value}`;
  }

  public setInitialValue(value: number) {
    this.formControl.setValue(value);
  }

  public disable() {
    this.formControl.disable();
  }

  public enable() {
    this.formControl.enable();
  }

  public required() {
    this.formControl.addValidators(this.greaterThanZeroValidators());
  }

  public resetToInitialState() {
    this.formControl.setValue(this.initialValue);

    if (this.isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }

    if (this.isRequired) {
      this.formControl.setValidators(this.greaterThanZeroValidators());
    } else {
      this.formControl.clearValidators();
    }

    this.formControl.updateValueAndValidity();
  }

  public greaterThanZeroValidators(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value > 0) {
        return null;
      } else {
        return { greaterThanZero: true };
      }
    };
  }
}
