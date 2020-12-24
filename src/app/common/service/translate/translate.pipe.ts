import { TranslateService } from './translate.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor( private translateService: TranslateService)
  {

  }
  transform(value: string, ...args: unknown[]): string {
    return this.translateService.get(value);
  }

}
