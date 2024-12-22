import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Draw,
  DrawEvents,
  DrawMap,
  featureGroup,
  FeatureGroup,
  LatLngExpression,
  layerGroup,
  LayerGroup,
  LeafletEvent,
  map,
  marker,
  Marker,
  polyline,
} from 'leaflet';
import 'leaflet-draw';
import { IdsMissionPoint } from '../../../../../shared/types/ids-mission-point.type';
import { MapTileService } from '../../../../../core/services/map-tile.service';
import { PathTileLayer } from '../../../classes/path-tile-layer.type';
import { EditableMap } from '../../../classes/editable-map.type';
import { MapLayer, MapLayerType } from '../../../../../features/map/types/map-layer.type';
import { MapLayersComponent } from '../../molecules/map-layers/map-layers.component';
import { MapPageLayoutComponent } from '../../layouts/map-page-layout/map-page-layout.component';
import { FSService } from '../../../../../core/services/fs.service';
import { DialogModule } from 'primeng/dialog';
// import parse_georaster from 'georaster';
// import GeoRasterLayer, { GeoRaster } from 'georaster-layer-for-leaflet';
// import * as proj4 from 'proj4';

@Component({
  selector: 'app-planner-map',
  standalone: true,
  imports: [CommonModule, DialogModule, MapPageLayoutComponent, MapLayersComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements EditableMap, AfterViewInit {
  private readonly _mapTileService = inject(MapTileService);
  private readonly _fsService = inject(FSService);

  private readonly _mapElement = viewChild.required<ElementRef<HTMLElement>>('map');

  // Inputs
  public readonly $missionPoints = input.required<Array<IdsMissionPoint>>({ alias: 'missionPoints' });
  public readonly $mapLayers = input<Array<MapLayer>>(
    [{ name: 'open street map', type: 'tile', url: 'https://tile.openstreetmap.org', activated: true }],
    { alias: 'baseMapLayers' }
  );
  public readonly $selectedMissionPoint = input<IdsMissionPoint | null>(null, { alias: 'selectedMissionPoint' });

  // Outputs
  public readonly markerAdded = output<IdsMissionPoint>();
  public readonly markerClicked = output<IdsMissionPoint | null>();
  public readonly drop = output<DragEvent>();

  protected readonly $isNewLayerDialogOpen = signal<boolean>(false);

  private _map!: DrawMap;
  private _markersLayer: FeatureGroup = featureGroup();
  private _pathLayer: FeatureGroup = featureGroup();
  private _mapLayers: { [K in MapLayerType]: LayerGroup } = {
    tile: layerGroup(),
    height: layerGroup(),
    overlay: layerGroup(),
  };

  constructor() {
    effect(() => {
      this._markersLayer.clearLayers();
      this._pathLayer.clearLayers();

      this.$missionPoints().forEach((point: IdsMissionPoint, index: number) => {
        if (point.special === 'HOME') {
          marker([point.latitude, point.longitude])
            .bindPopup(
              () =>
                `<b>H</b><br>latitude: ${point.latitude}<br>longitude: ${point.longitude}<br>altitude: ${point.altitude}`
            )
            .addTo(this._markersLayer)
            .on('dblclick', () => this.onMarkerClicked(point));
        } else {
          marker([point.latitude, point.longitude])
            .bindPopup(
              () =>
                `<b>${index}</b><br>latitude: ${point.latitude}<br>longitude: ${point.longitude}<br>altitude: ${point.altitude}`
            )
            .addTo(this._markersLayer)
            .on('dblclick', () => this.onMarkerClicked(point));
        }
      });
      polyline(
        this.$missionPoints().map((point: IdsMissionPoint) => [point.latitude, point.longitude]) as LatLngExpression[],
        { color: 'red', dashArray: [1, 10] }
      ).addTo(this._pathLayer);
    });

    effect(() => {
      const selectedMissionPoint = this.$selectedMissionPoint();
      if (selectedMissionPoint) {
        this._map.flyTo({ lat: selectedMissionPoint.latitude, lng: selectedMissionPoint.longitude });
      }
    });

    effect(() => {
      Object.values(this._mapLayers).forEach((layerGroup) => {
        layerGroup.clearLayers();
      });

      this.$mapLayers().forEach((layer) => {
        switch (layer.type) {
          case 'tile':
            this._mapLayers.tile.addLayer(
              new PathTileLayer(layer.url, this._mapTileService, {
                maxZoom: 19,
                minZoom: 0,
              })
            );
            break;
          case 'height':
            // this._mapLayers.tile.addLayer(
            //   new GeoRasterLayer({
            //     georaster: layer.url,
            //     opacity: 0.7,
            //     resolution: 64,
            //   })
            // );
            break;
        }
      });
    });
  }

  public ngAfterViewInit(): void {
    // create map
    this._map = map(this._mapElement().nativeElement, { layers: [], zoomControl: false });

    const resizeObserver = new ResizeObserver(() => {
      this._map.invalidateSize();
    });

    resizeObserver.observe(this._mapElement().nativeElement);

    // add layers
    Object.values(this._mapLayers).forEach((layerGroup) => {
      this._map.addLayer(layerGroup);
    });
    this._map.addLayer(this._markersLayer);
    this._map.addLayer(this._pathLayer);

    // this._fsService.getFile('D:\\flightway\\flightway-maps\\tiff\\mimad_wgs84u36_r10_0_1.tif').then((data: ArrayBuffer) => {
    //   parse_georaster(data).then((georaster: GeoRaster) => {
    //     const tiffLayer = new GeoRasterLayer({
    //       georaster: georaster,
    //       opacity: 0.7,
    //       resolution: 64,
    //     });
    //     console.log(tiffLayer);
    //     tiffLayer.addTo(this._map);
    //     this._map.fitBounds(tiffLayer.getBounds());

    //     // const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';
    //     // const epsg32636 = '+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs';

    //     // Geographic coordinates (latitude, longitude)
    //     // const lat = 31.74; // Example latitude
    //     // const lon = 34.71; // Example longitude

    //     // Convert to EPSG:32636 (UTM zone 36N)
    //     //const utmCoords = proj4(wgs84, epsg32636, [lon, lat]);

    //     // const x = Math.floor((34.71 - georaster.xmin) / georaster.pixelWidth);
    //     // const y = Math.floor((georaster.ymax - 31.74) / georaster.pixelHeight);

    //     // Get the value at the pixel coordinates (band 0 for single band rasters)
    //     // const value = georaster.values![0][y][x];
    //     // console.log(value);
    //   });
    // });

    // set view
    this._map.setView([31.698341938933652, 35.08022474362937], 7);

    this._map.on(Draw.Event.CREATED, (e: LeafletEvent) => {
      const createEvent: DrawEvents.Created = e as DrawEvents.Created;
      const type = createEvent.layerType;
      const layer = createEvent.layer;
      if (type === 'marker') {
        const marker = layer as Marker;
        const { lat, lng } = marker.getLatLng();
        this.markerAdded.emit({
          id: crypto.randomUUID(),
          special: 'REGULAR',
          category: 'WAYPOINT',
          latitude: lat,
          longitude: lng,
          altitude: 100,
        });
      }
    });
  }

  public drawMarker(): void {
    const markerDrawer = new Draw.Marker(this._map, { repeatMode: true });
    markerDrawer.enable();
  }

  @HostListener('drop', ['$event'])
  protected onDropMap(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files) {
      for (const file of files) {
        console.log(this._fsService.getFilePath(file));
      }
    }

    this.$isNewLayerDialogOpen.set(true);
  }

  protected onMarkerClicked(missionPoint: IdsMissionPoint | null) {
    this.markerClicked.emit(missionPoint);
  }
}
