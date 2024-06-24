import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagcircComponent } from './diagcirc.component';

describe('DiagcircComponent', () => {
  let component: DiagcircComponent;
  let fixture: ComponentFixture<DiagcircComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagcircComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagcircComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
