import { IpcMain } from 'electron';
import { readFile } from 'fs/promises';

export default function registerMapEvents(ipcMainInstance: IpcMain) {
  ipcMainInstance.handle(
    'get-map-tile',
    async (event, baseUrl: string, z: number, x: number, y: number): Promise<string> => {
      const parsedBaseUrl = new URL(baseUrl);
      const path = parsedBaseUrl.hostname + parsedBaseUrl.pathname.slice(1);
      switch (parsedBaseUrl.protocol) {
        case 'http:':
        case 'https:':
          return tileMapStringHttp(parsedBaseUrl.protocol, path, z, x, y);
        case 'file:':
        default:
          return tileMapStringFileSystem(path, z, x, y);
      }
    }
  );
}

async function tileMapStringFileSystem(path: string, z: number, x: number, y: number): Promise<string> {
  return readFile(`${path}\\${z}\\${x}\\${y}.png`)
    .then((data) => {
      const base64Image = data.toString('base64');
      return `data:image/png;base64,${base64Image}`;
    })
    .catch(() => {
      throw new Error('tile map file not found');
    });
}

async function tileMapStringHttp(protocol: string, path: string, z: number, x: number, y: number): Promise<string> {
  return new Promise((resolver) => {
    resolver(`${protocol}//${path}/${z}/${x}/${y}.png`);
  });
}
