import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTransacctionComponent } from './check-transacction.component';

describe('CheckTransacctionComponent', () => {
  let component: CheckTransacctionComponent;
  let fixture: ComponentFixture<CheckTransacctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTransacctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTransacctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
