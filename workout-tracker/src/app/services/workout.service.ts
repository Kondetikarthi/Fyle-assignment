import { Injectable } from '@angular/core';
import { User, Workout } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  private readonly STORAGE_KEY = 'workoutData';

  getUsers(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.initializeDefaultData();
  }

  addWorkout(name: string, workout: Workout): void {
    const users = this.getUsers();
    const existingUser = users.find(u => u.name.toLowerCase() === name.toLowerCase());

    if (existingUser) {
      existingUser.workouts.push(workout);
    } else {
      users.push({
        id: users.length + 1,
        name,
        workouts: [workout]
      });
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  private initializeDefaultData(): User[] {
    const defaultData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30, date: new Date('2023-01-15') },
          { type: 'Cycling', minutes: 45, date: new Date('2023-01-16') }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60, date: new Date('2023-01-14') },
          { type: 'Running', minutes: 20, date: new Date('2023-01-15') }
        ]
      }
    ];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
}
