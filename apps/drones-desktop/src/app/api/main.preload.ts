import { ApiContextBridge } from '@drones-app/shared';
import { contextBridge, ipcRenderer, webUtils } from 'electron';

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
    getFilePath: (file: File) => webUtils.getPathForFile(file),
    getFile: (url: string) => ipcRenderer.invoke('get-file', url),
  },
};

contextBridge.exposeInMainWorld('electron', apiContextBridge);
