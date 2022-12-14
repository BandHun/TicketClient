import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourtableComponent } from './hourtable.component';

describe('HourtableComponent', () => {
  let component: HourtableComponent;
  let fixture: ComponentFixture<HourtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourtableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
