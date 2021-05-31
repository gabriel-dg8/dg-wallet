import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTransacctionsComponent } from './chart-transacctions.component';

describe('ChartTransacctionsComponent', () => {
  let component: ChartTransacctionsComponent;
  let fixture: ComponentFixture<ChartTransacctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartTransacctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTransacctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
