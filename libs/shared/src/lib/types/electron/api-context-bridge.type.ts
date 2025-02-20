export interface ApiContextBridge {
  app: {
    getAppVersion: () => Promise<string>;
    getAppPlatform: () => Promise<string>;
    setAppDarkTheme: (darkTheme: boolean) => void;
  };
  map: {
    getMapTile: (baseUrl: string, z: number, x: number, y: number) => Promise<string>;
  };
  fs: {
    getFilePath: (file: File) => string;
    getFile: (url: string) => Promise<ArrayBuffer>;
  };
}
