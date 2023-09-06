import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DEFAULT_ADDRESS } from '../address-form/address.constant';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressFormComponent],
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent {
  company = new FormGroup({
    address: new FormControl(DEFAULT_ADDRESS),
  });

  constructor() {}

  switchAddressState(): void {
    this.company.controls.address.enabled
      ? this.company.controls.address.disable()
      : this.company.controls.address.enable();
  }
}
