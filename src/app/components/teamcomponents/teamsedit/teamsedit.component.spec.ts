import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamseditComponent } from './teamsedit.component';

describe('TeamseditComponent', () => {
  let component: TeamseditComponent;
  let fixture: ComponentFixture<TeamseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
