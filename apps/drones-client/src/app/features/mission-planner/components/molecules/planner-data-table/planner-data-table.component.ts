import { ChangeDetectionStrategy, Component, computed, inject, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MapPoint, EnrichedMissionPoint, MissionPoint } from '@drones-app/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ColumnConfig } from '../../../../../shared/types/column-config.type';
import { PlannerDataTableFieldComponent } from '../../atoms/planner-data-table-field/planner-data-table-field.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, PlannerDataTableFieldComponent],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  private confirmationService = inject(ConfirmationService);

  public readonly $enrichedMissionPoints = input.required<Array<EnrichedMissionPoint>>({ alias: 'missionPoints' });
  public readonly $slectedMissionPoint = model<EnrichedMissionPoint | null>(null, { alias: 'slectedMissionPoint' });

  protected readonly $missionPointsDataTable = computed<Array<EnrichedMissionPoint & { id: number }>>(() =>
    this.$enrichedMissionPoints().map((missionPoint, index) => {
      return { ...missionPoint, id: index };
    })
  );

  protected copiedDataTable: Array<EnrichedMissionPoint & { id: number }> = [];

  public readonly updateTable = output<Array<MissionPoint>>();

  protected columns: Array<ColumnConfig<EnrichedMissionPoint>> = [
    {
      field: 'category',
      header: 'Type',
      editable: true,
    },
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
      units: 'm',
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

  protected onEditInitMissionPoint(rowIndex: number) {
    this.copiedDataTable[rowIndex] = cloneDeep(this.$missionPointsDataTable()[rowIndex]);
  }

  protected onEditSaveMissionPoint() {
    this.onUpdateTable();
  }

  protected onEditCancelMissionPoint(rowIndex: number) {
    this.$missionPointsDataTable()[rowIndex] = this.copiedDataTable[rowIndex];
    delete this.copiedDataTable[rowIndex];
  }

  protected onDeleteMissionPoint(rowIndex: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete mission point #' + rowIndex + '?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateTable.emit(this.$missionPointsDataTable().filter((_, index) => index != rowIndex));
      },
    });
  }
}
