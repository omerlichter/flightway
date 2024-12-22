import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeightMapLayer, MapLayer, MapLayerType, OverlayMapLayer, TileMapLayer } from '../../../types/map-layer.type';
import { mapLayerToIcon } from '../../../config/map-layer-to-icon.config';
import { AccordionModule } from 'primeng/accordion';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-map-layers',
  standalone: true,
  imports: [CommonModule, AccordionModule],
  templateUrl: './map-layers.component.html',
  styleUrl: './map-layers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLayersComponent {
  // Inputs
  public readonly $mapLayers = input.required<Array<MapLayer>>({ alias: 'mapLayers' });

  protected readonly $tileLayers = computed<Array<TileMapLayer>>(() =>
    this.$mapLayers().filter((layer) => layer.type === 'tile')
  );
  protected readonly $heightLayers = computed<Array<HeightMapLayer>>(() =>
    this.$mapLayers().filter((layer) => layer.type === 'height')
  );
  protected readonly $overlayLayers = computed<Array<OverlayMapLayer>>(() =>
    this.$mapLayers().filter((layer) => layer.type === 'overlay')
  );
}
