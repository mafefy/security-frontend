import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public static dataMap : any = {};
  constructor() { }

  public put(key: string , data: any) {
    ShareService.dataMap[key] = data;
  }

  public get(key: string): any {
    return ShareService.dataMap[key];
  }

  public delete(key: string) {
    if ( ShareService.dataMap.key) {
      delete ShareService.dataMap.key;
    }
  }
}
