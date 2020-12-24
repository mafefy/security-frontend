import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../service/common/common.service';
import { ListOption } from './list-option';

@Component({
  selector: 'list-box',
  templateUrl: './list-box.component.html',
  styleUrls: ['./list-box.component.css']
})
export class ListBoxComponent implements OnInit {

  @Input() label : string;
  public listOptions: ListOption [];
  public selectedOptions : ListOption [];
  public selectedOption: ListOption;
  public isMultiple = true;
  public showList = true;

  @Output() onChange = new EventEmitter();

  constructor(public cs: CommonService) {

  }

  ngOnInit(): void {

  }


  @Input()
  set multiple( _multiple: boolean ) {
    this.isMultiple = _multiple;
  }

  @Input()
  set options( _options: ListOption []) {
    this.listOptions = _options;
  }

  public onOptionsSelected() {

  }

  public onOptionSelected() {

  }

  public onDone() {
    this.onChange.emit( this.isMultiple ? this.selectedOptions : this.selectedOption);
  }

  public onClosed() {
    this.showList = false;
    this.onDone();
  }

  getSelectionsLabel(): string {
    if ( this.isMultiple) {
      let tr: string = this.cs.translateService.get('selections-count');
      return tr.replace("{0}" , this.selectedOptions.length.toString());
    } else {
      return this.selectedOption.label;
    }
  }
}
