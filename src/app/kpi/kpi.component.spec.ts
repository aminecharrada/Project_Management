import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { KPIComponent } from './kpi.component';

describe('KPIComponent', () => {
  let component: KPIComponent;
  let fixture: ComponentFixture<KPIComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KPIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
