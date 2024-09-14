import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogPoleComponent } from './mat-dialog-pole.component';

describe('MatDialogPoleComponent', () => {
  let component: MatDialogPoleComponent;
  let fixture: ComponentFixture<MatDialogPoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogPoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogPoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
