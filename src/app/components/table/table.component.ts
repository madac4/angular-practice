import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [LucideAngularModule, SkeletonComponent, NgIf],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input({ required: true }) isLoading: boolean;
  @Output() searchQuery = new EventEmitter<Event>();
  constructor() {
    this.isLoading = false;
  }
}
