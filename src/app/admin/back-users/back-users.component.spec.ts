import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackUsersComponent } from './back-users.component';

describe('BackUsersComponent', () => {
  let component: BackUsersComponent;
  let fixture: ComponentFixture<BackUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
