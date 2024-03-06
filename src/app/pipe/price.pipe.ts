import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number, currency?: string): string {
    const formattedValue = new Intl.NumberFormat('de-DE').format(value);

    if (!currency || currency.toUpperCase() === 'USD') {
      return `$${formattedValue}`;
    }

    return `${formattedValue} ${currency}`;
  }
}
