import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Draw, DrawMap, featureGroup, FeatureGroup, Layer, LayerGroup, map } from 'leaflet';
import 'leaflet-draw';
import { MapTileService } from '../../../../../core/services/map-tile.service';
import { PathTileLayer } from '../../../../../shared/types/path-tile-layer.type';
import { EditableMap } from '../../../../../shared/types/editable-map.type';
import { MapPoint } from '@drones-app/shared';

@Component({
  selector: 'app-planner-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-map.component.html',
  styleUrl: './planner-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMapComponent implements EditableMap, AfterViewInit {
  private _mapTileService = inject(MapTileService);

  @Output() public marked = new EventEmitter<MapPoint>();

  private _map!: DrawMap;
  private _drawLayer!: FeatureGroup;

  public ngAfterViewInit(): void {
    this._map = map('map', { layers: [] });
    // load from file system'file://C:/Users/omer/drones_maps/osm'
    this._map.addLayer(new PathTileLayer('https://tile.openstreetmap.org', this._mapTileService, {}));
    this._map.setView([31.698341938933652, 35.08022474362937], 7);

    this._drawLayer = featureGroup();
    this._map.addLayer(this._drawLayer);

    this._map.on(Draw.Event.CREATED, (e: any) => {
      const type = e.layerType;
      if (type === 'marker') {
        // Do marker specific actions
      }
    });
  }

  public drawMarker(): void {
    const markerDrawer = new Draw.Marker(this._map, {});
    markerDrawer.enable();
  }
}
