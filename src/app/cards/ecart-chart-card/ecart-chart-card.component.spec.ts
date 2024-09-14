import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EcartChartCardComponent } from './ecart-chart-card.component';

describe('EcartChartCardComponent', () => {
  let component: EcartChartCardComponent;
  let fixture: ComponentFixture<EcartChartCardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EcartChartCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcartChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
