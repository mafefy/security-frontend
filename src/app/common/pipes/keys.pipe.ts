import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(obj: any, ...args: unknown[]): unknown {

    let keys = [];
    for ( let key in obj) {
      keys.push( key);
    }
    return keys;
  }

}
