import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerDetailsComponent } from './servicer-details.component';

describe('ServicerDetailsComponent', () => {
  let component: ServicerDetailsComponent;
  let fixture: ComponentFixture<ServicerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicerDetailsComponent]
    });
    fixture = TestBed.createComponent(ServicerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
