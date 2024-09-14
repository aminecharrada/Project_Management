import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogProjectComponent } from './mat-dialog-project.component';

describe('MatDialogProjectComponent', () => {
  let component: MatDialogProjectComponent;
  let fixture: ComponentFixture<MatDialogProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
