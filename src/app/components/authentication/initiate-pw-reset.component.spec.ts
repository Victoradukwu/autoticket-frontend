import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiatePwResetComponent } from './initiate-pw-reset.component';

describe('InitiatePwResetComponent', () => {
  let component: InitiatePwResetComponent;
  let fixture: ComponentFixture<InitiatePwResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiatePwResetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiatePwResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
