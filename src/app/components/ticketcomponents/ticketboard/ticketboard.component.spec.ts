import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketboardComponent } from './ticketboard.component';

describe('TicketboardComponent', () => {
  let component: TicketboardComponent;
  let fixture: ComponentFixture<TicketboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
