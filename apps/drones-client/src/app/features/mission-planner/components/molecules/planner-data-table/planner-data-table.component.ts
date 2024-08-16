import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MapPoint, MissionPoint } from '@drones-app/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  public readonly $missionPoints = input.required<Array<MissionPoint>>({ alias: 'missionPoints' });

  protected readonly $missionPointsDataTable = computed<Array<MissionPoint & { id: number }>>(() =>
    this.$missionPoints().map((missionPoint, index) => {
      return { ...missionPoint, id: index };
    })
  );

  public readonly updateTable = output<Array<MapPoint>>();

  protected columns: Array<{ header: string; field: keyof MissionPoint; editable: boolean }> = [
    {
      field: 'latitude',
      header: 'Latitude',
      editable: true,
    },
    {
      field: 'longitude',
      header: 'Longitude',
      editable: true,
    },
    {
      field: 'altitude',
      header: 'Altitude',
      editable: true,
    },
    {
      field: 'gradient',
      header: 'Gradient',
      editable: false,
    },
    {
      field: 'angle',
      header: 'Angle',
      editable: false,
    },
    {
      field: 'distance',
      header: 'Distance',
      editable: false,
    },
    {
      field: 'azimuth',
      header: 'Azimuth',
      editable: false,
    },
  ];

  protected onUpdateTable() {
    this.updateTable.emit(this.$missionPointsDataTable());
  }
}
