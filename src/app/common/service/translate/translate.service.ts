import { EventsService } from 'src/app/common/service/events/events.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common/common.service';

export enum LANGUAGES {
  ENGLISH = "en", ARABIC = "ar"
}
export enum LANGUAGES_EVENTS {
  CHANGE_LANGUAGE = "change-language"
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  public static CHANGE_LANGUAGE_EVENT = 'change-language-event';
  private static resources;
  constructor(
    private httpClient: HttpClient,
    public events: EventsService) {

  }

  public async loadTranslationResources(feedback) {
    let lngPath = 'assets/local/' + this.getCurrentLanguage() + '.json';
    await this.httpClient.get<any>(lngPath).toPromise().then((resources) => {
      TranslateService.resources = resources;
      feedback(true);
    }, () => {
      console.log("Retry to reload system translation files");
      setTimeout(() => {
        this.loadTranslationResources(feedback);
      }, 1000);
    });
  }

  private static LNG_KEY = 'current-language';
  public getCurrentLanguage() {
    let currentLanguage = localStorage.getItem(TranslateService.LNG_KEY);
    return currentLanguage ? currentLanguage : LANGUAGES.ENGLISH;
  }


  public setCurrentLanguage(lng: LANGUAGES, trigger ) {
    localStorage.setItem(TranslateService.LNG_KEY, lng);
    if ( trigger) {
      this.events.triggerEvent( TranslateService.CHANGE_LANGUAGE_EVENT, null);
    }
  }

  public get(key: string): string {
    if (TranslateService.resources) {
      return key ? TranslateService.resources[key] : 'No Translation For :' + key;
    } else {
      return '';
    }
  }
}
