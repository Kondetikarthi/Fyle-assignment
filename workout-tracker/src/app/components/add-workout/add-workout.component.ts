import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss']
})
export class AddWorkoutComponent {
  workoutForm: any; // Temporary declaration

  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService
  ) {
    // Initialize form after dependency injection
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['Running', Validators.required],
      minutes: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.workoutForm.valid) {
      const name = this.workoutForm.get('name')?.value as string;
      const type = this.workoutForm.get('type')?.value as string;
      const minutes = Number(this.workoutForm.get('minutes')?.value);

      this.workoutService.addWorkout(name, {
        type,
        minutes,
        date: new Date()
      });
      
      this.workoutForm.reset({ type: 'Running' });
    }
  }
}
