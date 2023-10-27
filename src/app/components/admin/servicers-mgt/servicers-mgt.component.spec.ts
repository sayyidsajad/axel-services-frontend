import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicersMgtComponent } from './servicers-mgt.component';

describe('ServicersMgtComponent', () => {
  let component: ServicersMgtComponent;
  let fixture: ComponentFixture<ServicersMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicersMgtComponent]
    });
    fixture = TestBed.createComponent(ServicersMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
