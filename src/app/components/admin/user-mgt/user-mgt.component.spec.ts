import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMgtComponent } from './user-mgt.component';

describe('UserMgtComponent', () => {
  let component: UserMgtComponent;
  let fixture: ComponentFixture<UserMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMgtComponent]
    });
    fixture = TestBed.createComponent(UserMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
