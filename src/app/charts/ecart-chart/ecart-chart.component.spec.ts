import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcartChartComponent } from './ecart-chart.component';

describe('EcartChartComponent', () => {
  let component: EcartChartComponent;
  let fixture: ComponentFixture<EcartChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcartChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcartChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
