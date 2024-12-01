import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { EnrichedMissionPoint, MissionPoint } from '@drones-app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { PlannerDataTableFieldComponent } from '../../atoms/planner-data-table-field/planner-data-table-field.component';
import { cloneDeep } from 'lodash';
import { PlannerDataTableActionsFieldComponent } from '../../atoms/planner-data-table-actions-field/planner-data-table-actions-field.component';
import {
  PlannerDataTableHomeRowConfig,
  PlannerDataTableRowConfig,
} from '../../../config/planner-data-table-row.config';

@Component({
  selector: 'app-planner-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    PlannerDataTableFieldComponent,
    PlannerDataTableActionsFieldComponent,
  ],
  templateUrl: './planner-data-table.component.html',
  styleUrl: './planner-data-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableComponent {
  private confirmationService = inject(ConfirmationService);

  public readonly $enrichedMissionPoints = input.required<Array<EnrichedMissionPoint>>({ alias: 'missionPoints' });
  public readonly $selectedMissionPointIndex = input.required<number | null>({ alias: 'selectedMissionPointIndex' });

  protected readonly $missionPointsDataTable = computed<Array<EnrichedMissionPoint & { id: number }>>(() =>
    this.$enrichedMissionPoints().map((missionPoint, index) => {
      return { ...missionPoint, id: index };
    })
  );

  protected readonly $selectionDataTable = signal<(EnrichedMissionPoint & { id: number }) | null>(null);

  protected rowConfig = PlannerDataTableRowConfig;
  protected homeRowConfig = PlannerDataTableHomeRowConfig;

  protected copiedDataTable: Array<EnrichedMissionPoint & { id: number }> = [];

  public readonly updateTable = output<Array<MissionPoint>>();
  public readonly selectMissionPointIndex = output<number | null>();

  constructor() {
    effect(
      () => {
        const selectionPoint = this.$selectionDataTable();
        if (selectionPoint) {
          this.selectMissionPointIndex.emit(selectionPoint.id);
        } else {
          this.selectMissionPointIndex.emit(null);
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        const selectionPointIndex = this.$selectedMissionPointIndex();
        if (selectionPointIndex !== null) {
          this.$selectionDataTable.set(this.$missionPointsDataTable()[selectionPointIndex]);
        } else {
          this.$selectionDataTable.set(null);
        }
      },
      { allowSignalWrites: true }
    );
  }

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

  protected trackByFunction(index: number, item: unknown & { id: number }) {
    return item.id; // O index
  }
}
