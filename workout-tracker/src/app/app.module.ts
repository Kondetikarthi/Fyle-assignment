import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-lis/workout-lis.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWorkoutComponent,
    WorkoutListComponent,
    WorkoutChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
