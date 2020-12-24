import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { CommonService } from '../../service/common/common.service';

@Component({
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {


  @Input() public primary: string;
  @Input() public secondary: string;

  @Input() public isPrimary: boolean  = null;
  @Output() selected = new EventEmitter();

  public state: string;

  public options: SelectItem[];
  public selectedOption: number;

  constructor(
    public cs: CommonService
  ) {

  }

  ngOnInit(): void {
    this.options = [
      { label: this.primary, value: ToggleStatus.PRIMARY },
      { label: this.secondary, value: ToggleStatus.SECONDARY }
    ];
    if ( this.isPrimary != null ) {
      this.selectedOption = this.isPrimary ? ToggleStatus.PRIMARY : ToggleStatus.SECONDARY ;
    }
  }


  private previousSelection: number;
  public onChange() {

    // same selection we reset
    if (this.previousSelection == this.selectedOption) {
      this.previousSelection = null;
      this.selectedOption = null;
      this.selected.emit( ToggleStatus.NONE);
    } else { // different options
       
      this.previousSelection = this.selectedOption;
      this.selected.emit(this.selectedOption);
    }

  }

}

export enum ToggleStatus {
  NONE = -1, PRIMARY = 0, SECONDARY = 1 
}
