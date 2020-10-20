import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealexComponent } from './realex.component';

describe('RealexComponent', () => {
  let component: RealexComponent;
  let fixture: ComponentFixture<RealexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
