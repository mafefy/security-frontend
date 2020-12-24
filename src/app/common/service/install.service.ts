import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InstallService {

  constructor() {
    
  }

  public registerBeforeInstallEvent(onReady) {
    window.addEventListener('beforeinstallprompt', (e: any) => {
    
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      this.beforeInstallEvent = e;
      onReady();
      // Stash the event so it can be triggered later.
      //e.prompt();
    });
  }

  private beforeInstallEvent: any;

  public promptInstallation(onInstalled: any, onCancelled: any) {
    if ( this.beforeInstallEvent ) {
      this.beforeInstallEvent.prompt();
      // Wait for the user to respond to the prompt
      this.beforeInstallEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          onInstalled();
        } else {
          onCancelled();
        }
      });

    }
  }
}
