import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User } from '../models/user.model';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
    localStorage.clear();
  });

  it('should add new workout to existing user', () => {
    const initialUsers = service.getUsers();
    const testName = initialUsers[0].name;
    const initialWorkoutCount = initialUsers[0].workouts.length;
    
    service.addWorkout(testName, { type: 'Test', minutes: 30, date: new Date() });
    const updatedUsers = service.getUsers();
    
    expect(updatedUsers[0].workouts.length).toBe(initialWorkoutCount + 1);
  });

  it('should create new user when name not found', () => {
    const initialCount = service.getUsers().length;
    service.addWorkout('New User', { type: 'Yoga', minutes: 45, date: new Date() });
    expect(service.getUsers().length).toBe(initialCount + 1);
  });
});