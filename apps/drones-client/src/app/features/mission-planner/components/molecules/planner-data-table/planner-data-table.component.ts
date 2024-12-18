import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
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
import { IdsEnrichedMissionPoint } from '../../../../../shared/types/ids-enriched-mission-point.type';
import { IdsMissionPoint } from '../../../../../shared/types/ids-mission-point.type';

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

  // Inputs
  public readonly $enrichedMissionPoints = input.required<Array<IdsEnrichedMissionPoint>>({ alias: 'missionPoints' });
  public readonly $selectedMissionPoint = input<IdsMissionPoint | null>(null, { alias: 'selectedMissionPoint' });

  // Outputs
  public readonly updateTable = output<Array<IdsMissionPoint>>();
  public readonly selectMissionPoint = output<IdsMissionPoint>();

  protected rowConfig = PlannerDataTableRowConfig;
  protected homeRowConfig = PlannerDataTableHomeRowConfig;

  protected copiedDataTable: Array<IdsEnrichedMissionPoint> = [];

  protected onUpdateTable() {
    this.updateTable.emit(this.$enrichedMissionPoints());
  }

  protected onEditInitMissionPoint(rowIndex: number) {
    this.copiedDataTable[rowIndex] = cloneDeep(this.$enrichedMissionPoints()[rowIndex]);
  }

  protected onEditSaveMissionPoint() {
    this.onUpdateTable();
  }

  protected onEditCancelMissionPoint(rowIndex: number) {
    this.$enrichedMissionPoints()[rowIndex] = this.copiedDataTable[rowIndex];
    delete this.copiedDataTable[rowIndex];
  }

  protected onDeleteMissionPoint(rowIndex: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete mission point #' + rowIndex + '?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateTable.emit(this.$enrichedMissionPoints().filter((_, index) => index != rowIndex));
      },
    });
  }

  protected onSelectedMissionPoint(missionPoint: IdsMissionPoint) {
    this.selectMissionPoint.emit(missionPoint);
  }

  protected trackByFunction(index: number, item: unknown & { id: number }) {
    return item.id; // O index
  }
}
