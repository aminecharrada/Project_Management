import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressbarChartComponent } from './progressbar-chart.component';

describe('ProgressbarChartComponent', () => {
  let component: ProgressbarChartComponent;
  let fixture: ComponentFixture<ProgressbarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressbarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressbarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
