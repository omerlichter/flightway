import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-planner-data-table-option-field',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './planner-data-table-option-field.component.html',
  styleUrl: './planner-data-table-option-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableOptionFieldComponent<T> {
  public readonly $value = model.required<T>({ alias: 'value' });
  public readonly $options = input.required<Array<T>>({ alias: 'options' });
  public readonly $placeholder = input<string>('Select option', { alias: 'placeholder' });
}
