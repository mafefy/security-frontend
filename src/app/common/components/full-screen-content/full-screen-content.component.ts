import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'full-screen-content',
  templateUrl: './full-screen-content.component.html',
  styleUrls: ['./full-screen-content.component.css']
})
export class FullScreenContentComponent implements OnInit {

  @Input() transparent = true;
  public  backgroundColor: string;
  constructor() { }

  ngOnInit(): void {

    if ( this.transparent ) {
      this.backgroundColor = 'transparent';
    } else {
      this.backgroundColor = 'var(--background-color)';
    }
  }

}
