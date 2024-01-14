import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatehComponent } from './createh.component';

describe('CreatehComponent', () => {
  let component: CreatehComponent;
  let fixture: ComponentFixture<CreatehComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatehComponent]
    });
    fixture = TestBed.createComponent(CreatehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
