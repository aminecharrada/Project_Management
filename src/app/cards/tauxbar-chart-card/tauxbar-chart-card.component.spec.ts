import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TauxbarChartCardComponent } from './tauxbar-chart-card.component';

describe('TauxbarChartCardComponent', () => {
  let component: TauxbarChartCardComponent;
  let fixture: ComponentFixture<TauxbarChartCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TauxbarChartCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TauxbarChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
