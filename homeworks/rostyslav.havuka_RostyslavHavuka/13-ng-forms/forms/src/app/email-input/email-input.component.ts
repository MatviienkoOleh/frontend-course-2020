import { Component, forwardRef} from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true
    }
  ]
})
export class EmailInputComponent implements ControlValueAccessor {
  constructor(public controlContainer: ControlContainer) { }

  label: string = 'Email:';
  value: string;
  onChange = (value: any) => { };
  onTouch = () => { };

  writeValue(value) {
    this.value = value
  };

  registerOnChange(fn: any) {
    this.onChange = fn;
  };

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  };

  updateValue(val) {
    this.value = val;
    this.onChange(val);
    this.onTouch();
    this.updatelabel()
  }

  updatelabel() {
    this.label = this.controlContainer.control.get("email").hasError('email') ?
      'Not a valid!' :
      'Email:';
  }
}
