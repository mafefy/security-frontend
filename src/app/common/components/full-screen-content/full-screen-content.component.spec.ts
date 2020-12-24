import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenContentComponent } from './full-screen-content.component';

describe('FullScreenContentComponent', () => {
  let component: FullScreenContentComponent;
  let fixture: ComponentFixture<FullScreenContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
