import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MissionPlannerPageLayoutComponent } from '../layouts/mission-planner-page-layout/mission-planner-page-layout.component';
import { PlannerMapComponent } from '../organisms/planner-map/planner-map.component';
import { EditableMap } from '../../../../shared/types/editable-map.type';
import { PlannerToolbarComponent } from '../molecules/planner-toolbar/planner-toolbar.component';
import { PlannerDataTableComponent } from '../molecules/planner-data-table/planner-data-table.component';

@Component({
  selector: 'app-mission-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    MissionPlannerPageLayoutComponent,
    PlannerMapComponent,
    PlannerDataTableComponent,
    PlannerToolbarComponent,
  ],
  templateUrl: './mission-planner-page.component.html',
  styleUrl: './mission-planner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlannerPageComponent {
  private _$editableMapComponent = viewChild.required<EditableMap>(PlannerMapComponent);

  protected onDrawMarker(): void {
    this._$editableMapComponent().drawMarker();
  }
}
