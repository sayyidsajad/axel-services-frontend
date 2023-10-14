import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersOtpVerificationComponent } from './servicers-otp-verification.component';

describe('ServicersOtpVerificationComponent', () => {
  let component: ServicersOtpVerificationComponent;
  let fixture: ComponentFixture<ServicersOtpVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicersOtpVerificationComponent]
    });
    fixture = TestBed.createComponent(ServicersOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
