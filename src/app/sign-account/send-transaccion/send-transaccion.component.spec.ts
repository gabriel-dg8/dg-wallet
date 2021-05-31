import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTransaccionComponent } from './send-transaccion.component';

describe('SendTransaccionComponent', () => {
  let component: SendTransaccionComponent;
  let fixture: ComponentFixture<SendTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendTransaccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
