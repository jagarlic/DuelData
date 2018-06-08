import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatStatsComponent } from './format-stats.component';

describe('FormatStatsComponent', () => {
  let component: FormatStatsComponent;
  let fixture: ComponentFixture<FormatStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
