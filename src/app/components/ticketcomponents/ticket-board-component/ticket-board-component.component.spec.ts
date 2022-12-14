import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBoardComponentComponent } from './ticket-board-component.component';

describe('TicketBoardComponentComponent', () => {
  let component: TicketBoardComponentComponent;
  let fixture: ComponentFixture<TicketBoardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketBoardComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBoardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
