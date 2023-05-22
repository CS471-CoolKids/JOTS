import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorsignupComponent } from './tutorsignup.component';

describe('TutorsignupComponent', () => {
  let component: TutorsignupComponent;
  let fixture: ComponentFixture<TutorsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorsignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
