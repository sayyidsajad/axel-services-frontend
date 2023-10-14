import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersApprovalComponent } from './servicers-approval.component';

describe('ServicersApprovalComponent', () => {
  let component: ServicersApprovalComponent;
  let fixture: ComponentFixture<ServicersApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicersApprovalComponent]
    });
    fixture = TestBed.createComponent(ServicersApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
