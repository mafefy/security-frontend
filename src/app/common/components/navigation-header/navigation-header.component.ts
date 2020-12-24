import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'nav-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() back = true;
  @Input() menu = false;
  @Input() option = false;
  @Input() optionIcon = 'pi-ellipsis-h';
  @Input() navigate = true;
  @Output() menuClicked = new EventEmitter();
  @Output() backClicked = new EventEmitter();
  @Output() optionClicked = new EventEmitter();
  
  constructor(
    public location: Location
  ) { }

  ngOnInit(): void {
    this.menu = this.back ? false: true;
    this.back = this.menu ? false: true;
  }

  onMenuClicked() {
    this.menuClicked.emit();
  }

  onBackClicked() {
    if ( this.navigate ) {
      this.location.back();
    }
    this.backClicked.emit();
  }

  onOptionClicked() {
    this.optionClicked.emit();
  }
}
