import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCRUDComponent } from './course-crud.component';

describe('CourseCRUDComponent', () => {
  let component: CourseCRUDComponent;
  let fixture: ComponentFixture<CourseCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCRUDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
