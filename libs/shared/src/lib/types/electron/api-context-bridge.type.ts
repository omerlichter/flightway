export interface ApiContextBridge {
  app: {
    getAppVersion: () => Promise<string>;
    getAppPlatform: () => Promise<string>;
  };
  map: {
    getMapTile: (baseUrl: string, z: number, x: number, y: number) => Promise<string>;
  };
  fs: {
    getFile: (url: string) => Promise<ArrayBuffer>;
  };
}
