import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-planner-data-table-actions-field',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: './planner-data-table-actions-field.component.html',
  styleUrl: './planner-data-table-actions-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerDataTableActionsFieldComponent {
  // Inputs
  public readonly $editing = input.required<boolean>({ alias: 'editing' });
  public readonly $hasDelete = input<boolean>(true, { alias: 'hasDelete' });

  // Outputs
  public readonly edit = output<void>();
  public readonly delete = output<void>();
  public readonly save = output<void>();
  public readonly cancel = output<void>();

  protected onEdit(): void {
    this.edit.emit();
  }

  protected onDelete(): void {
    this.delete.emit();
  }

  protected onSave(): void {
    this.save.emit();
  }

  protected onCancel(): void {
    this.cancel.emit();
  }
}
