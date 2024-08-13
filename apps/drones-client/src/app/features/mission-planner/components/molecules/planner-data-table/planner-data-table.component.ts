import { ChangeDetectionStrategy, Component, input, output, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, TableRowReorderEvent } from 'primeng/table';
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
  public readonly $pathPoints = input.required<Array<MapPoint>>({ alias: 'pathPoints' });

  public readonly pathPointsChanged = output<Array<MapPoint>>();

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

  protected onRowReorder(a: TableRowReorderEvent) {
    this.pathPointsChanged.emit(this.$pathPoints());
  }
}
