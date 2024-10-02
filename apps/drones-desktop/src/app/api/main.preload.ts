import { ApiContextBridge } from '@drones-app/shared';
import { contextBridge, ipcRenderer } from 'electron';

const apiContextBridge: ApiContextBridge = {
  app: {
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    getAppPlatform: () => ipcRenderer.invoke('get-app-platform'),
  },
  map: {
    getMapTile: (baseUrl: string, z: number, x: number, y: number) =>
      ipcRenderer.invoke('get-map-tile', baseUrl, z, x, y),
  },
  fs: {
    getFile: (url: string) => ipcRenderer.invoke('get-file', url),
  },
};

contextBridge.exposeInMainWorld('electron', apiContextBridge);
