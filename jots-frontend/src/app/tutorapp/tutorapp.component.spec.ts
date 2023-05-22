import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorappComponent } from './tutorapp.component';

describe('TutorappComponent', () => {
  let component: TutorappComponent;
  let fixture: ComponentFixture<TutorappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
