import { NgModule } from '@angular/core';
import { PhoneMaskDirective } from './mask.directive';

@NgModule({
  declarations: [PhoneMaskDirective],
  exports: [PhoneMaskDirective],
})
export class MaskModule {}
