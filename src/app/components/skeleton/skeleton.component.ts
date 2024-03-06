import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [NgClass],
  templateUrl: './skeleton.component.html',
})
export class SkeletonComponent {
  @Input() classNames: string;

  constructor() {
    this.classNames = '';
  }
}
