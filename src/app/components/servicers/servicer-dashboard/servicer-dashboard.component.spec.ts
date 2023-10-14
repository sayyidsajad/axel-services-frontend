import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerDashboardComponent } from './servicer-dashboard.component';

describe('ServicerDashboardComponent', () => {
  let component: ServicerDashboardComponent;
  let fixture: ComponentFixture<ServicerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicerDashboardComponent]
    });
    fixture = TestBed.createComponent(ServicerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
