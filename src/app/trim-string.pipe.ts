import { stringify } from '@angular/compiler/src/util';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimString'
})
export class TrimStringPipe implements PipeTransform {

  transform(value: string): string {
  
    const trimLength = 50;

    if(value.length > trimLength) {
      return value.substring(0, trimLength) + "..."
    }
    return value;
  }

}
