import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMgtComponent } from './booking-mgt.component';

describe('BookingMgtComponent', () => {
  let component: BookingMgtComponent;
  let fixture: ComponentFixture<BookingMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingMgtComponent]
    });
    fixture = TestBed.createComponent(BookingMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
