import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-planner-data-table-coord-field',
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumberModule],
  templateUrl: './planner-data-table-coord-field.component.html',
  styleUrl: './planner-data-table-coord-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableCoordFieldComponent {
  public readonly $value = model.required<number>({ alias: 'value' });
  public readonly $coordType = input.required<'latitude' | 'longitude' | 'altitude'>({ alias: 'coordType' });

  protected readonly $max = computed<number>(() => {
    switch (this.$coordType()) {
      case 'latitude':
        return 90;
      case 'longitude':
        return 180;
      case 'altitude':
        return 100000;
    }
  });

  protected readonly $min = computed<number>(() => {
    switch (this.$coordType()) {
      case 'latitude':
        return -90;
      case 'longitude':
        return -180;
      case 'altitude':
        return -100000;
    }
  });

  protected readonly $suffix = computed<string>(() => {
    switch (this.$coordType()) {
      case 'latitude':
        return '';
      case 'longitude':
        return '';
      case 'altitude':
        return 'm';
    }
  });
}
