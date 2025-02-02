import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-8 text-center">Workout Tracker</h1>
      <app-add-workout class="mb-8"></app-add-workout>
      <app-workout-list></app-workout-list>
    </div>
  `
})




export class AppComponent {}

