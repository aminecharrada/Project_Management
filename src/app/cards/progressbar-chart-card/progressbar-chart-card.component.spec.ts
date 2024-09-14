import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressbarChartCardComponent } from './progressbar-chart-card.component';

describe('ProgressbarChartCardComponent', () => {
  let component: ProgressbarChartCardComponent;
  let fixture: ComponentFixture<ProgressbarChartCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressbarChartCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressbarChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
