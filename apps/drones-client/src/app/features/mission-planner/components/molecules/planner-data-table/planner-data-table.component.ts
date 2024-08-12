import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MapPoint } from '@drones-app/shared';

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  protected points: Array<MapPoint> = [
    { x: 0, y: 1, z: 0.5 },
    { x: 23, y: 56, z: 0.5 },
    { x: 76, y: 8, z: 0 },
    { x: 3, y: 11, z: 22 },
  ];

  protected columns: Array<{ header: string; field: keyof MapPoint }> = [
    {
      field: 'x',
      header: 'X',
    },
    {
      field: 'y',
      header: 'Y',
    },
    {
      field: 'z',
      header: 'Z',
    },
  ];
}
