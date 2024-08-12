import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-planner-toolbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, DividerModule, TooltipModule],
  templateUrl: './planner-toolbar.component.html',
  styleUrl: './planner-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerToolbarComponent {
  @Output() public drawMarker = new EventEmitter<void>();

  protected onDrawMarker() {
    this.drawMarker.emit();
  }
}
