import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ToggleOptionModel } from './models';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss'],
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule, CommonModule],
})
export class ButtonToggleGroupComponent implements OnInit {
  @Input() public title = '';
  @Input() public groupName = 'toggleGroup';
  @Input() public multiple = false;
  @Input() public options: ToggleOptionModel[] = [];
  @Input() public formControl!: FormControl;

  @Output() public selectionChange = new EventEmitter<string | string[]>();

  private initialValue: any;
  private initialDisabledState = false;

  public ngOnInit() {
    this.initialValue = this.formControl.value;
    this.initialDisabledState = this.formControl.disabled;

    if (!this.formControl.value) {
      this.formControl.setValue(this.multiple ? [] : '');
    }
  }

  public clickEventionChange(event: any): void {
    this.selectionChange.emit(event.value);
  }

  public enable(): void {
    this.formControl.enable();
  }

  public disable(): void {
    this.formControl.disable();
  }

  public resetToInitialState(): void {
    this.formControl.setValue(this.initialValue);
    this.formControl.markAsPristine();
    this.formControl.markAsUntouched();

    if (this.initialDisabledState) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
