import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwissComponent } from './swiss.component';

describe('SwissComponent', () => {
  let component: SwissComponent;
  let fixture: ComponentFixture<SwissComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwissComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwissComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
