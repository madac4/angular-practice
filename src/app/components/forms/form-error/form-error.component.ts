import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [NgIf],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  @Input() control: any;
}
