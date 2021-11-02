import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsEventCardComponent } from './events-event-card.component';

describe('EventCardComponent', () => {
  let component: EventsEventCardComponent;
  let fixture: ComponentFixture<EventsEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
