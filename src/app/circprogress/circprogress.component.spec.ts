import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircprogressComponent } from './circprogress.component';

describe('CircprogressComponent', () => {
  let component: CircprogressComponent;
  let fixture: ComponentFixture<CircprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
