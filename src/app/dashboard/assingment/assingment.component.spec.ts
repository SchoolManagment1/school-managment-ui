import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingmentComponent } from './assingment.component';

describe('AssingmentComponent', () => {
  let component: AssingmentComponent;
  let fixture: ComponentFixture<AssingmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssingmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssingmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
