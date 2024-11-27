import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MapLayer } from '../../../types/map-layer.type';
import { TreeNode } from 'primeng/api';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-map-layers',
  standalone: true,
  imports: [CommonModule, TreeModule],
  templateUrl: './map-layers.component.html',
  styleUrl: './map-layers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLayersComponent {
  public readonly $mapLayers = input.required<Array<MapLayer>>({ alias: 'mapLayers' });

  public readonly $treeLayers = computed<TreeNode[]>(() => {
    const layersDictionary = groupBy(this.$mapLayers(), 'type');
    console.log(layersDictionary);
    return Object.entries(layersDictionary).map<TreeNode>(([key, layers]) => ({
      label: key,
      icon: 'pi pi-fw pi-map',
      children: layers.map<TreeNode>((layer) => ({ label: layer.name, icon: 'pi pi-fw pi-map' })),
    }));
  });
}
