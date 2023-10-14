import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerProceduresComponent } from './servicer-procedures.component';

describe('ServicerProceduresComponent', () => {
  let component: ServicerProceduresComponent;
  let fixture: ComponentFixture<ServicerProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicerProceduresComponent]
    });
    fixture = TestBed.createComponent(ServicerProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
