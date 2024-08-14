import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  output,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Draw,
  DrawEvents,
  DrawMap,
  featureGroup,
  FeatureGroup,
  LatLngExpression,
  LeafletEvent,
  map,
  marker,
  Marker,
  polyline,
} from 'leaflet';
import 'leaflet-draw';
import { MapTileService } from '../../../../../core/services/map-tile.service';
import { PathTileLayer } from '../../../../../shared/types/path-tile-layer.type';
import { EditableMap } from '../../../../../shared/types/editable-map.type';
import { MapPoint, MissionPoint } from '@drones-app/shared';

@Component({
  selector: 'app-planner-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-map.component.html',
  styleUrl: './planner-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMapComponent implements EditableMap, AfterViewInit {
  private readonly _mapTileService = inject(MapTileService);

  public readonly $missionPoints = input.required<Array<MissionPoint>>({ alias: 'missionPoints' });
  public readonly $homePoint = input.required<MapPoint>({ alias: 'homePoint' });

  public readonly markerAdded = output<MapPoint>();

  private _map!: DrawMap;
  private _markersLayer!: FeatureGroup;
  private _pathLayer!: FeatureGroup;

  constructor() {
    effect(() => {
      this._markersLayer.clearLayers();
      this._pathLayer.clearLayers();

      const homePoint = this.$homePoint();
      marker([homePoint.latitude, homePoint.longitude])
        .bindPopup(() => `<b>H</b><br>latitude: ${homePoint.latitude}, longitude: ${homePoint.longitude}`)
        .addTo(this._markersLayer);

      this.$missionPoints().forEach((point: MissionPoint, index: number) => {
        marker([point.latitude, point.longitude])
          .bindPopup(() => `<b>${index}</b><br>latitude: ${point.latitude}, longitude: ${point.longitude}`)
          .addTo(this._markersLayer);
      });
      polyline(
        [
          [homePoint.latitude, homePoint.longitude],
          ...(this.$missionPoints().map((point: MissionPoint) => [
            point.latitude,
            point.longitude,
          ]) as LatLngExpression[]),
        ],
        { color: 'red', dashArray: [1, 10] }
      ).addTo(this._pathLayer);
    });
  }

  public ngAfterViewInit(): void {
    this._map = map('map', { layers: [] });
    // load from file system'file://C:/Users/omer/drones_maps/osm'
    this._map.addLayer(
      new PathTileLayer('https://tile.openstreetmap.org', this._mapTileService, { maxZoom: 19, minZoom: 1 })
    );
    this._map.setView([31.698341938933652, 35.08022474362937], 7);

    this._markersLayer = featureGroup();
    this._pathLayer = featureGroup();
    this._map.addLayer(this._markersLayer);
    this._map.addLayer(this._pathLayer);

    this._map.on(Draw.Event.CREATED, (e: LeafletEvent) => {
      const createEvent: DrawEvents.Created = e as DrawEvents.Created;
      const type = createEvent.layerType;
      const layer = createEvent.layer;
      if (type === 'marker') {
        const marker = layer as Marker;
        const { lat, lng } = marker.getLatLng();
        this.markerAdded.emit({ latitude: lat, longitude: lng, altitude: 100 });
      }
    });
  }

  public drawMarker(): void {
    const markerDrawer = new Draw.Marker(this._map, { repeatMode: true });
    markerDrawer.enable();
  }
}
