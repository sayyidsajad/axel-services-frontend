import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerApprovalComponent } from './servicer-approval.component';

describe('ServicerApprovalComponent', () => {
  let component: ServicerApprovalComponent;
  let fixture: ComponentFixture<ServicerApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicerApprovalComponent]
    });
    fixture = TestBed.createComponent(ServicerApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
