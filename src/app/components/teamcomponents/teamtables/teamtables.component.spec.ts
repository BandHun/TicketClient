import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamtablesComponent } from './teamtables.component';

describe('TeamtablesComponent', () => {
  let component: TeamtablesComponent;
  let fixture: ComponentFixture<TeamtablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamtablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamtablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
