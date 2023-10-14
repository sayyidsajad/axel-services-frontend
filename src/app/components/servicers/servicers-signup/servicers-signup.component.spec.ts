import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersSignupComponent } from './servicers-signup.component';

describe('ServicersSignupComponent', () => {
  let component: ServicersSignupComponent;
  let fixture: ComponentFixture<ServicersSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicersSignupComponent]
    });
    fixture = TestBed.createComponent(ServicersSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
