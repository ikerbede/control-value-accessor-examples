import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule, Routes } from '@angular/router';
import { CompanyFormComponent } from './company-form/company-form.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';

const CVA_ROUTES: Routes = [
  {
    path: 'company',
    loadComponent: () => CompanyFormComponent,
  },
  {
    path: 'weather',
    loadComponent: () => WeatherFormComponent,
  },
];

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h1>ControlValueAccessor Examples</h1>
    <nav>
      <ul>
        <li><a routerLink="weather">Weather Form</a></li>
        <li><a routerLink="company">Company Form</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class App {}

bootstrapApplication(App, { providers: [provideRouter(CVA_ROUTES)] });
