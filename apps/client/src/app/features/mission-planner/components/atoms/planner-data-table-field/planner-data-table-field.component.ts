import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerDataTableCoordFieldComponent } from '../planner-data-table-coord-field/planner-data-table-coord-field.component';
import { MissionPoint, missionPointCategories } from '@flightway-app/shared';
import { PlannerDataTableOptionFieldComponent } from '../planner-data-table-option-field/planner-data-table-option-field.component';

@Component({
  selector: 'app-planner-data-table-field',
  standalone: true,
  imports: [CommonModule, PlannerDataTableCoordFieldComponent, PlannerDataTableOptionFieldComponent],
  templateUrl: './planner-data-table-field.component.html',
  styleUrl: './planner-data-table-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableFieldComponent<F extends keyof MissionPoint> {
  public readonly $value = model.required<any>({ alias: 'value' });
  public readonly $field = input.required<F>({ alias: 'field' });

  protected readonly missionPointCategories = [...missionPointCategories];
}
