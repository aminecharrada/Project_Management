import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BarChartCardComponent } from './bar-chart-card.component';

describe('BarChartCardComponent', () => {
  let component: BarChartCardComponent;
  let fixture: ComponentFixture<BarChartCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
