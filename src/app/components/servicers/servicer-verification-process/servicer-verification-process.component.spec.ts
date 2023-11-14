import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerVerificationProcessComponent } from './servicer-verification-process.component';

describe('ServicerVerificationProcessComponent', () => {
  let component: ServicerVerificationProcessComponent;
  let fixture: ComponentFixture<ServicerVerificationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicerVerificationProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicerVerificationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
