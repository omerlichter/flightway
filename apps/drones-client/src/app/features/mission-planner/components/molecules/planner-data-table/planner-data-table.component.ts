import { ChangeDetectionStrategy, Component, ComponentRef, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MapPoint, MissionPoint } from '@drones-app/shared';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { PlannerDataTableCoordFieldComponent } from '../../atoms/planner-data-table-coord-field/planner-data-table-coord-field.component';

type editableColumnConfig<T> = {
  header: string;
  field: keyof T;
  editable: true;
  inputComponent: any;
  inputComponentOptions: any;
};

type nonEditableColumnConfig<T> = {
  header: string;
  field: keyof T;
  editable: false;
};

type columnConfig<T> = editableColumnConfig<T> | nonEditableColumnConfig<T>;

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, PlannerDataTableCoordFieldComponent],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  private confirmationService = inject(ConfirmationService);

  public readonly $missionPoints = input.required<Array<MissionPoint>>({ alias: 'missionPoints' });

  protected readonly $missionPointsDataTable = computed<Array<MissionPoint & { id: number }>>(() =>
    this.$missionPoints().map((missionPoint, index) => {
      return { ...missionPoint, id: index };
    })
  );

  public readonly updateTable = output<Array<MapPoint>>();

  protected columns: Array<columnConfig<MissionPoint>> = [
    {
      field: 'latitude',
      header: 'Latitude',
      editable: true,
      inputComponent: PlannerDataTableCoordFieldComponent,
      inputComponentOptions: {},
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

  protected onEditMissionPoint(rowIndex: number, missionPoint: MissionPoint) {
    console.log(rowIndex, missionPoint);
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
