import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase',
})
export class ToUpperCasePipe implements PipeTransform {
  public transform(value: string): string {
    if (!value) return '';
    return value.toUpperCase();
  }
}
//<p>{{ texto | toUpperCase }}</p>
