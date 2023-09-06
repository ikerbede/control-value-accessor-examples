import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  forwardRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Address } from './address.model';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
  ],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
})
export class AddressFormComponent implements ControlValueAccessor, OnInit {
  address = new FormGroup({
    streetNumber: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    streetName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    additionalInformation: new FormControl<string | null>(null),
    postalCode: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    country: new FormControl('FRANCE', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  touched = false;

  private _onChange = (address: Address) => {};
  private _onTouched = () => {};

  private _destroyRef = inject(DestroyRef);

  constructor() {}

  ngOnInit(): void {
    this.address.valueChanges
      .pipe(
        map((value: Partial<Address>) => {
          value.additionalInformation = !!value.additionalInformation?.trim()
            ? value.additionalInformation?.trim()
            : null;
          return value;
        }),
        filter(
          (value: Partial<Address>) =>
            this.address.valid &&
            !!value.streetNumber &&
            !!value.streetName?.trim() &&
            !!value.country?.trim() &&
            !!value.city?.trim() &&
            !!value.country?.trim()
        ),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((value: Partial<Address>) => {
        this._markAsTouched();
        this._onChange(value as Address);
      });
  }

  writeValue(address: Address): void {
    this.address.setValue(address);
  }

  setDisabledState(disabled: boolean): void {
    disabled ? this.address.disable() : this.address.enable();
  }

  registerOnChange(fn: (value: Address) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  private _markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this._onTouched();
    }
  }
}
