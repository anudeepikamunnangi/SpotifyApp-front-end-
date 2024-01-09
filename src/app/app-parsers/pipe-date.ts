import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): Date {
    const dateParts = value.split('T')[0].split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
    const day = parseInt(dateParts[2], 10);

    return new Date(year, month, day);
  }
}
