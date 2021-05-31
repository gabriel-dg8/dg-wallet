import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBlocksComponent } from './check-blocks.component';

describe('CheckBlocksComponent', () => {
  let component: CheckBlocksComponent;
  let fixture: ComponentFixture<CheckBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
