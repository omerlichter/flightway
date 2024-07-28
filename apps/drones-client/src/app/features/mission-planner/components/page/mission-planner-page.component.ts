import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MissionPlannerPageLayoutComponent } from '../layouts/mission-planner-page-layout/mission-planner-page-layout.component';
import { PlannerMapComponent } from '../organisms/planner-map/planner-map.component';

@Component({
  selector: 'app-mission-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
    MissionPlannerPageLayoutComponent,
    PlannerMapComponent,
  ],
  templateUrl: './mission-planner-page.component.html',
  styleUrl: './mission-planner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlannerPageComponent {}
