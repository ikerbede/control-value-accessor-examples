import { CommonModule } from '@angular/common';
import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-thermometer-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThermometerInputComponent),
      multi: true,
    },
  ],
  templateUrl: './thermometer-input.component.html',
  styleUrls: ['./thermometer-input.component.css'],
})
export class ThermometerInputComponent implements ControlValueAccessor {
  temperature = 20;
  touched = false;
  disabled = false;

  private _onChange = (temperature: number) => {};
  private _onTouched = () => {};

  constructor() {}

  writeValue(temperature: number): void {
    this.temperature = temperature;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  registerOnChange(fn: (value: number) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setTemperature(temperature: number): void {
    if (!this.disabled) {
      this._markAsTouched();
    }
    this.temperature = temperature;
    this._onChange(temperature);
  }

  private _markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this._onTouched();
    }
  }
}
