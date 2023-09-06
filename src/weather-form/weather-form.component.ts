import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThermometerInputComponent } from '../thermometer-input/thermometer-input.component';

@Component({
  selector: 'app-weather-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ThermometerInputComponent],
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css'],
})
export class WeatherFormComponent {
  weather = new FormGroup({
    temperature: new FormControl(20),
  });

  constructor() {}

  switchThermometerState(): void {
    this.weather.controls.temperature.enabled
      ? this.weather.controls.temperature.disable()
      : this.weather.controls.temperature.enable();
  }
}
