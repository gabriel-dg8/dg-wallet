import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacctionComponent } from './transacction.component';

describe('TransacctionComponent', () => {
  let component: TransacctionComponent;
  let fixture: ComponentFixture<TransacctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransacctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
