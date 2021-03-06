import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyComma'
})
/**
 * Dar formato a un número 1,000.00
 */
export class CurrencyCommaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(Number.parseFloat(value + "")).replace('$', '');
  }

}
