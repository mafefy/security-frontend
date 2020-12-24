import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[blocked]'
})
export class BlockedDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.touchAaction = 'none';
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onEvent(e) {
    e.stopPropagation();
    return false;
  }


}
