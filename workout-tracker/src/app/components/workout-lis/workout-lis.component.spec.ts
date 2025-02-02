import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutLisComponent } from './workout-lis.component';

describe('WorkoutLisComponent', () => {
  let component: WorkoutLisComponent;
  let fixture: ComponentFixture<WorkoutLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutLisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
