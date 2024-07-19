import { ApiContextBridge } from '@drones-app/shared';
import { contextBridge, ipcRenderer } from 'electron';

const apiContextBridge: ApiContextBridge = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
};

contextBridge.exposeInMainWorld('electron', apiContextBridge);
