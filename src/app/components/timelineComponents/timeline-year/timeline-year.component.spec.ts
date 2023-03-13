import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineYearComponent } from './timeline-year.component';

describe('TimelineYearComponent', () => {
  let component: TimelineYearComponent;
  let fixture: ComponentFixture<TimelineYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
