import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MapLayer, MapLayerType } from '../../../types/map-layer.type';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { Dictionary, groupBy } from 'lodash';
import { mapLayerToIcon } from '../../../config/map-layer-to-icon.config';

@Component({
  selector: 'app-map-layers',
  standalone: true,
  imports: [CommonModule, TreeModule],
  providers: [TreeDragDropService],
  templateUrl: './map-layers.component.html',
  styleUrl: './map-layers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLayersComponent {
  public readonly $mapLayers = input.required<Array<MapLayer>>({ alias: 'mapLayers' });

  public readonly $treeLayers = computed<TreeNode[]>(() => {
    const layersDictionary = groupBy(this.$mapLayers(), 'type');
    return Object.entries(layersDictionary).map<TreeNode>(([key, layers]) => ({
      label: key,
      icon: mapLayerToIcon[key as MapLayerType],
      draggable: false,
      droppable: false,
      leaf: false,
      children: layers.map<TreeNode>((layer) => ({ label: layer.name, leaf: true })),
    }));
  });
}
