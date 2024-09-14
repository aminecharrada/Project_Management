import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatContactDialogComponent } from './mat-contact-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ng2-avatar';

describe('MatContactDialogComponent', () => {
  let component: MatContactDialogComponent;
  let fixture: ComponentFixture<MatContactDialogComponent>;
  let matDialogRefMock: jasmine.SpyObj<MatDialogRef<MatContactDialogComponent>>;

  beforeEach(async(() => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        AvatarModule
      ],
      declarations: [MatContactDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'John Doe', email: 'john.doe@example.com' } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
