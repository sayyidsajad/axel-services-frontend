import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersLoginComponent } from './servicers-login.component';

describe('ServicersLoginComponent', () => {
  let component: ServicersLoginComponent;
  let fixture: ComponentFixture<ServicersLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicersLoginComponent]
    });
    fixture = TestBed.createComponent(ServicersLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
