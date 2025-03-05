import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPlanningComponent } from './event-planning.component';

describe('EventPlanningComponent', () => {
  let component: EventPlanningComponent;
  let fixture: ComponentFixture<EventPlanningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventPlanningComponent]
    });
    fixture = TestBed.createComponent(EventPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
