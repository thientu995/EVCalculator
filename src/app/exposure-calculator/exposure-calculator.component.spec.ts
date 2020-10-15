import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureCalculatorComponent } from './exposure-calculator.component';

describe('ExposureCalculatorComponent', () => {
  let component: ExposureCalculatorComponent;
  let fixture: ComponentFixture<ExposureCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExposureCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposureCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
