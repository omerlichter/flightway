import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-mission-planner-page-layout',
  standalone: true,
  imports: [CommonModule, SplitterModule],
  templateUrl: './mission-planner-page-layout.component.html',
  styleUrl: './mission-planner-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlannerPageLayoutComponent {}
