import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinrequestComponent } from './joinrequest.component';

describe('JoinrequestComponent', () => {
  let component: JoinrequestComponent;
  let fixture: ComponentFixture<JoinrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
