import { Response } from 'src/app/common/models/response';
import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Touch } from 'src/app/common/models/touch';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {

  @Input() full: boolean = false;
  @Input() transparent = true;
  @Input() responsive = false;
  @Input() enableSliding = false;

  @Output() slideUp = new EventEmitter();
  @Output() slideDown = new EventEmitter();
  @Output() slideLeft = new EventEmitter();
  @Output() slideRight = new EventEmitter();

  public backgroundColor: string;
  constructor( ) {

  }

  ngOnInit(): void {

    if (this.transparent) {
      this.backgroundColor = 'transparent';
    } else {
      this.backgroundColor = 'var(--background-color)';
    }
  }
  @ViewChild('viewArea') viewArea: ElementRef;
  public scrollTop() {
    return this.viewArea ? this.viewArea.nativeElement.scrollTop : 0;
  }

  private scrollMargin = 25;
  public isScrollAtBottom() {
    let scrollTop = this.viewArea.nativeElement.scrollTop;
    let scrollHeight = this.viewArea.nativeElement.scrollHeight;
    let clientHeight = this.viewArea.nativeElement.clientHeight;
    return ((scrollHeight - scrollTop) <= (clientHeight + this.scrollMargin));
  }

  public isScrollAtTop() {
    let scrollTop = this.viewArea.nativeElement.scrollTop;
    return scrollTop <= this.scrollMargin;
  }


  /**
   monitor mouse panning from screen bottom to open next page
 */

  private getTouchPosition(event): Touch {
    if (event.touches && event.touches.length > 0) {
      let touch = event.touches[0];
      return new Touch(touch.pageX, touch.pageY);
    } else {
      return new Touch(event.offsetX, event.offsetY);
    }
  }




  private isDown = false;
  private touchDown: Touch;
  private isTouchedAtScreenBottom = false;
  private isScrollReachedBottom = false;
  private isScrollReachedTop = false;
  private touchDownMargin = 0.2;
  private touchDownTime = 0;

  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:mousedown', ['$event'])
  onMouseDown(e) {
    if (this.enableSliding) {
      this.isDown = true;
      this.touchDownTime = new Date().getTime();
      this.touchDown = this.getTouchPosition(e);
      this.upTouch = this.touchDown;
      let clientHeight = this.viewArea.nativeElement.clientHeight;
      this.isScrollReachedBottom = this.isScrollAtBottom();
      this.isScrollReachedTop = this.isScrollAtTop();
      /*
      this.isTouchedAtScreenBottom =
      this.touchDown.y >=  ( clientHeight - (clientHeight * this.touchDownMargin)  ) ;
      */

    }
  }

  private upTouch: Touch;
  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onMouseMove(e) {
    this.upTouch = this.getTouchPosition(e);
  }

  private touchVerticalOffset = 0.15;
  private touchHorizontalOffset = 0.2;
  private scrollTime =  1000;

  @HostListener('window:touchend', ['$event'])
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(e) {
    if (this.enableSliding) {
      this.isDown = false;
      // if released in proper time difference
      if ( ( new Date().getTime() - this.touchDownTime ) <= this.scrollTime) {

        if ( ! this.checkVerticalSliding() ) {
          this.checkHorizontalSliding();
        }
      }
    }
  }

  /**
   * 1- Slide up when reached page bottom
   * 2- Slide down when reached page top
   */

  private checkVerticalSliding() {
    let yDiff = this.touchDown.y - this.upTouch.y;
    let yAreaOffset = this.touchVerticalOffset * this.viewArea.nativeElement.clientHeight;

    // slide up when reached page bottom
    if (this.isScrollReachedBottom) {
      if (yDiff >= yAreaOffset) {
        this.slideUp.emit();
        return true;
      }
    }

    // slide down when reached page top
    if (this.isScrollReachedTop) {
      if ((- yDiff) >= yAreaOffset) {
        this.slideDown.emit();
        return true;
      }
    }
    return false;
  }


  /**
   * 1- Slide right
   * 2- Slide left
   */

   private checkHorizontalSliding() {
    let xDiff = this.upTouch.x - this.touchDown.x ;
    let xAreaOffset = this.touchHorizontalOffset * this.viewArea.nativeElement.clientWidth;
    let maxYDiff =  this.viewArea.nativeElement.clientHeight * 0.2;
    let isHorizontal = (this.upTouch.y - this.touchDown.y) <= maxYDiff ;
    // slide up when reached page bottom
    if (isHorizontal) {
      if (xDiff >= xAreaOffset) {
        this.slideRight.emit();
        return true;
      }

    // slide down when reached page top
      if ((-xDiff) >= xAreaOffset) {
        this.slideLeft.emit();
        return true;
      }
    }
    return false;

  }


  public scrollTopRatio() {
     return this.viewArea.nativeElement.scrollTop /this.viewArea.nativeElement.scrollHeight;

  }


  public width() {
    return this.viewArea.nativeElement.clientWidth;
  }

  public height() {
    return this.viewArea.nativeElement.clientHeight;
  }

  public scrollWidth() {
    return this.viewArea.nativeElement.scrollWidth;
  }

  public scrollHeight() {
    return this.viewArea.nativeElement.scrollHeight;
  }

}
