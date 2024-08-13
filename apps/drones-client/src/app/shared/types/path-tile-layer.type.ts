import { Coords, DoneCallback, GridLayer, GridLayerOptions } from 'leaflet';
import { MapTileService } from '../../core/services/map-tile.service';

export class PathTileLayer extends GridLayer {
  private _tilePath: string;
  private _mapTileService: MapTileService;

  constructor(tilePath: string, mapTileService: MapTileService, options: GridLayerOptions) {
    super(options);
    this._tilePath = tilePath;
    this._mapTileService = mapTileService;
  }

  protected override createTile(coords: Coords, done: DoneCallback): HTMLElement {
    const tile = document.createElement('img');
    this._mapTileService
      .getTile(this._tilePath, coords.z, coords.x, coords.y)
      .then((src: string) => {
        tile.src = src;
        done(undefined, tile);
      })
      .catch((error) => {
        done(error);
      });
    return tile;
  }
}
