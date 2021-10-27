import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventCardComponent } from './new-event-card.component';

describe('NewEventCardComponent', () => {
  let component: NewEventCardComponent;
  let fixture: ComponentFixture<NewEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
