import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appMask]',
})
export class PhoneMaskDirective {
  ngControl: NgControl = inject(NgControl);

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: Event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: Event) {
    this.onInputChange((event.target as HTMLInputElement).value, true);
  }

  onInputChange(event: any, backspace: any) {
    let inputValue = event.replace(/\D/g, '');

    if (backspace && inputValue.length <= 7) {
      inputValue = inputValue.substring(0, inputValue.length - 1);
    }
    if (inputValue.length === 0) {
      inputValue = '';
    } else if (inputValue.length <= 3) {
      // 373
      inputValue = inputValue.replace(/^(\d{0,3})/, '(+$1)');
    } else if (inputValue.length <= 7) {
      // 6752
      inputValue = inputValue.replace(/^(\d{0,3})(\d{0,4})/, '(+$1) ($2)');
    } else if (inputValue.length <= 10) {
      // 5214
      inputValue = inputValue.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})/, '(+$1) ($2)-$3');
    } else {
      inputValue = inputValue.substring(0, 11);
      inputValue = inputValue.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})/, '(+$1) ($2)-$3');
    }
    this.ngControl.valueAccessor!.writeValue(inputValue);
  }
}
