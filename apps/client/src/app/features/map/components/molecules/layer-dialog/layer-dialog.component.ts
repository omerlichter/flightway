import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { MapLayerType } from '../../../types/map-layer.type';
import { mapLayerTypes } from '../../../config/map-layer-types.config';

@Component({
  selector: 'app-layer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './layer-dialog.component.html',
  styleUrl: './layer-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerDialogComponent implements OnInit {
  private readonly _dynamicDialogConfig = inject(DynamicDialogConfig);

  protected readonly $path = signal<string>('');
  protected readonly $layerName = signal<string>('');
  protected readonly $layerType = signal<MapLayerType>('tile');

  protected readonly layerTypeOptions = mapLayerTypes;

  public ngOnInit(): void {
    const initPath = this._dynamicDialogConfig.data.initPath;

    this.$path.set(initPath);
  }

  protected onSubmit() {}
}
