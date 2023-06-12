import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorratingComponent } from './tutorrating.component';

describe('TutorratingComponent', () => {
  let component: TutorratingComponent;
  let fixture: ComponentFixture<TutorratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorratingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
