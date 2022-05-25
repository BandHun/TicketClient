import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketregistrationComponent } from './ticketregistration.component';

describe('TicketregistrationComponent', () => {
  let component: TicketregistrationComponent;
  let fixture: ComponentFixture<TicketregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
