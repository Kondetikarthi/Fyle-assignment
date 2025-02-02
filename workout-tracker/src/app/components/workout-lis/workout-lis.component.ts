import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  template: `
    <div class="p-4">
      <div class="flex gap-4 mb-4">
        <input [(ngModel)]="searchTerm" placeholder="Search by name" 
               class="p-2 border rounded" (input)="applyFilters()">
        
        <select [(ngModel)]="workoutFilter" (change)="applyFilters()" 
                class="p-2 border rounded">
          <option value="">All Workouts</option>
          <option *ngFor="let type of workoutTypes" [value]="type">{{ type }}</option>
        </select>
      </div>

      <table mat-table [dataSource]="dataSource" class="w-full">
        <!-- Columns -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element"> {{ element.name }} </td>
        </ng-container>

        <ng-container matColumnDef="workouts">
          <th mat-header-cell *matHeaderCellDef> Workouts </th>
          <td mat-cell *matCellDef="let element"> {{ element.workouts }} </td>
        </ng-container>

        <ng-container matColumnDef="count">
          <th mat-header-cell *matHeaderCellDef> Count </th>
          <td mat-cell *matCellDef="let element"> {{ element.count }} </td>
        </ng-container>

        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef> Total Minutes </th>
          <td mat-cell *matCellDef="let element"> {{ element.total }} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
    </div>
  `
})
export class WorkoutListComponent {
  displayedColumns = ['name', 'workouts', 'count', 'total'];
  dataSource = new MatTableDataSource<any>([]);
  searchTerm = '';
  workoutFilter = '';
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) {
    this.loadData();
  }

  private loadData(): void {
    const users = this.workoutService.getUsers();
    this.dataSource.data = users.map(user => ({
      name: user.name,
      workouts: user.workouts.map(w => w.type).join(', '),
      count: user.workouts.length,
      total: user.workouts.reduce((sum, w) => sum + w.minutes, 0)
    }));
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.customFilter;
  }

  private customFilter = (data: any, filter: string): boolean => {
    const filters = JSON.parse(filter);
    const nameMatch = data.name.toLowerCase().includes(filters.search.toLowerCase());
    const workoutMatch = filters.workoutType ? 
      data.workouts.includes(filters.workoutType) : true;
    return nameMatch && workoutMatch;
  };

  applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchTerm,
      workoutType: this.workoutFilter
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}