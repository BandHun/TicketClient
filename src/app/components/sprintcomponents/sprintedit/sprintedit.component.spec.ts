import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprinteditComponent } from './sprintedit.component';

describe('SprinteditComponent', () => {
  let component: SprinteditComponent;
  let fixture: ComponentFixture<SprinteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprinteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprinteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
