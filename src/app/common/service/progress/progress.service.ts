import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private static initialize: boolean = false;
  constructor() {

  }

  public start(id: string = null) {
     this.appendProgressBar(id);
     this.enableAppBlur(true);
    /*this.initialize(progressBar);
    progressBar.style.setProperty("display", "none");
    this.setVisiblity(progressBar,true);
    */
  }

  private initialize(progressBar: any) {
    if ( ProgressService.initialize == false) {
      ProgressService.initialize = true;
      progressBar.addEventListener( 'click' , (event) => {
        event.stopPropagation();
      });
    }
  }

  private setVisiblity(element: any, visible: boolean) {
    element.style.setProperty("display", visible ? "block" : "none");
  }

  private getProgressBar() {
    return document.getElementById("app-progress-bar");
  }

  public stop(id: string = null) {

    if ( id ) {
      let bar =document.getElementById(id);
      if ( bar) {
        bar.parentNode.removeChild(bar);
      }
      this.clearEffects();
    } else {
      this.removeAllProgressBars();
    }
    //this.setVisiblity(this.getProgressBar() , false);
  }


  private removeAllProgressBars() {
    // remove all progress bars
    let progressBars = document.getElementsByClassName("progress-bar");
    while ( progressBars.length > 0  ) {
      let bar = progressBars[0];
      bar.parentNode.removeChild(bar);
    }
    this.enableAppBlur(false);
  }

  /*
  if no exist bar we remove blur effect
  */
  private clearEffects() {
    let progressBars = document.getElementsByClassName("progress-bar") ;
    if ( ! (progressBars  && progressBars.length > 0 )) {
      this.enableAppBlur(false);
    }
  }
  private enableAppBlur(enable: boolean) {
    let body = document.getElementById("app-container");
    if ( body) {
      body.style.filter =  enable ?  "blur(2px)" : "";
    }
  }

  private appendProgressBar(id: string): any {
    let body =  document.getElementsByTagName("BODY")[0];
    let bar = this.createProgressBar(id);
    body.appendChild(bar);

    /*let progressBar =  document.getElementById(id);
    progressBar.addEventListener( 'click' , (event) => {
      event.stopPropagation();
      return false;
    });
    */
  }

  private createProgressBar(id: string) : any{
    var newBar = document.createElement("div");
    newBar.className += 'progress-bar';
    newBar.innerHTML ='<img id="animation" src="assets/images/busy-animation.png"> <img id="icon" src="assets/images/busy.gif" >';
    if ( id) {
      newBar.id = id;
    }
    newBar.addEventListener( 'click' , (event) => {
      event.stopPropagation();
      return false;
    });

    return newBar;
    /*
    if ( id ) {
      return '<div id="app-progress-' + id + '" class="progress-bar" > </div>';
    } else {
      return '<div  class="progress-bar" > </div>';
    }
    */
  }
}
