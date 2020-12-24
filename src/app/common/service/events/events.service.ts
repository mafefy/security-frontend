import { Injectable } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

class  EventSettings{
  public observer: any;
  public observable: Observable<any>;
  public subject: Subject<any>;
 
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private static events: any   = {};
  constructor() { }

  public register(event: string) : Subject<any>{
    if ( ! EventsService.events[event]) {
      EventsService.events[event] = this.createEvent(event);
    }
   // console.log("register for event");
    return EventsService.events[event].subject;
  }

  public triggerEvent(event: string, data: any) {
    let eventSettings: EventSettings = EventsService.events[event];
    if ( eventSettings){
      eventSettings.subject.next(data);
    }
  }

  
  private createEvent(event: string) {
    //console.log("create event :" + event);
    let eventSettings = new EventSettings();
    /*
    eventSettings.observable = Observable.create( (observer) => {
      eventSettings.observer = observer;
    });
    */
    eventSettings.subject = new Subject();
    return eventSettings;
  }

  public clearEvent(event: string) {
    let settings: EventSettings =  EventsService.events[event];
    if ( settings) {
      settings.subject.complete();
      delete EventsService.events[event];
    }
  }

}
