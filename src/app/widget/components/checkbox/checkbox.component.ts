import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { Task } from './models';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [
    MatCheckboxModule,
    NgFor,
    FormsModule,
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
})
export class CheckboxComponent {
  @Output() public clickEvent: EventEmitter<any> = new EventEmitter();
  @Input() public formControl!: FormControl;
  @Input() public items: Task[] = [];
  @Input() public isRequired = false;
  @Input() public isDisabled = false;

  public formControls: { [key: string]: FormControl } = {};
  public formGroup!: FormGroup;
  public initialStates: {
    [key: string]: { value: boolean; disabled: boolean };
  } = {};

  public ngOnInit(): void {
    this.items.forEach((item) => {
      this.formControls[item.cod] = new FormControl({
        value: item.checked,
        disabled: item.disabled,
      });

      this.initialStates[item.cod] = {
        value: item.checked,
        disabled: item.disabled,
      };
    });

    this.formGroup = new FormGroup(this.formControls);
    if (this.formControl) {
      this.formControl.setValue(this.formGroup.value);
      this.formGroup.valueChanges.subscribe((value) => {
        this.applyRequiredValidator();
        this.formControl.setValue(value);
      });
    }

    this.applyRequiredValidator();
  }

  private requiredTrueValidator(): any {
    return (control: FormControl) => {
      return this.hasTrueValue(control.value) === true
        ? null
        : { requiredTrue: true };
    };
  }

  private hasTrueValue(obj: any) {
    return Object.values(obj).some((valor) => valor === true);
  }

  private applyRequiredValidator(): void {
    if (this.isRequired) {
      this.formControl.addValidators(this.requiredTrueValidator());
    }
    this.formControl.updateValueAndValidity();
  }

  public resetToInitialState() {
    Object.keys(this.formControls).forEach((key) => {
      const initialState = this.initialStates[key];
      const control = this.formControls[key];

      control.setValue(initialState.value);
      initialState.disabled ? control.disable() : control.enable();
    });
  }

  public disable(): void {
    this.items.forEach((item) => {
      this.formControls[item.cod].disable();
    });
  }

  public enable(): void {
    this.items.forEach((item) => {
      if (!item.disabled) {
        this.formControls[item.cod].enable();
      }
    });
  }

  public getCheckboxValues(): { [key: string]: boolean } {
    return Object.keys(this.formControls).reduce(
      (result, key) => {
        result[key] = this.formControls[key].value;
        return result;
      },
      {} as { [key: string]: boolean }
    );
  }

  protected click() {
    this.clickEvent.emit(this.getCheckboxValues());
  }
}
