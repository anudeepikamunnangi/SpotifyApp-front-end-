import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewloginComponent } from './newlogin.component';

describe('NewloginComponent', () => {
  let component: NewloginComponent;
  let fixture: ComponentFixture<NewloginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewloginComponent]
    });
    fixture = TestBed.createComponent(NewloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
