import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingformComponent } from './ratingform.component';

describe('RatingformComponent', () => {
  let component: RatingformComponent;
  let fixture: ComponentFixture<RatingformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
