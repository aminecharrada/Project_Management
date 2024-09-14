import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxbarChartComponent } from './tauxbar-chart.component';

describe('TauxbarChartComponent', () => {
  let component: TauxbarChartComponent;
  let fixture: ComponentFixture<TauxbarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TauxbarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxbarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
