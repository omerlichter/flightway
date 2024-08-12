export abstract class MapTileService {
  public abstract getTile(baseUrl: string, z: number, x: number, y: number): Promise<string>;
}

export function MapTileServiceFactory(): MapTileService {
  if (window.electron) {
    return new MapTileElectronService();
  }

  return new MapTileWebService();
}

export class MapTileElectronService extends MapTileService {
  public override getTile(baseUrl: string, z: number, x: number, y: number): Promise<string> {
    return window.electron.map.getMapTile(baseUrl, z, x, y);
  }
}

export class MapTileWebService extends MapTileService {
  public override getTile(baseUrl: string, z: number, x: number, y: number): Promise<string> {
    return new Promise((resolver) => {
      resolver(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`);
    });
  }
}
