import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsregistrationComponent } from './teamsregistration.component';

describe('TeamsregistrationComponent', () => {
  let component: TeamsregistrationComponent;
  let fixture: ComponentFixture<TeamsregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsregistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
