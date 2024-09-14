import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatContactMenuComponent } from './mat-contact-menu.component';

describe('MatContactMenuComponent', () => {
  let component: MatContactMenuComponent;
  let fixture: ComponentFixture<MatContactMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatContactMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatContactMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
