import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableRowReorderEvent } from 'primeng/table';
import { MapPoint, MissionPoint } from '@drones-app/shared';

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  public readonly $missionPoints = model.required<Array<MissionPoint>>({ alias: 'missionPoints' });

  protected columns: Array<{ header: string; field: keyof MissionPoint }> = [
    {
      field: 'latitude',
      header: 'Latitude',
    },
    {
      field: 'longitude',
      header: 'Longitude',
    },
    {
      field: 'altitude',
      header: 'Altitude',
    },
    {
      field: 'gradient',
      header: 'Gradient',
    },
    {
      field: 'angle',
      header: 'Angle',
    },
    {
      field: 'distance',
      header: 'Distance',
    },
    {
      field: 'azimuth',
      header: 'Azimuth',
    },
  ];

  protected onRowReorder(row: TableRowReorderEvent) {
    this.$missionPoints.update((value: Array<MissionPoint>) => [...value]);
  }
}
