import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMgtComponent } from './category-mgt.component';

describe('CategoryMgtComponent', () => {
  let component: CategoryMgtComponent;
  let fixture: ComponentFixture<CategoryMgtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryMgtComponent]
    });
    fixture = TestBed.createComponent(CategoryMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
