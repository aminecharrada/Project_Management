import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridComponentComponent } from './grid-component.component';

describe('GridComponentComponent', () => {
  let component: GridComponentComponent;
  let fixture: ComponentFixture<GridComponentComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
