import { IpcMain } from 'electron';
import { readFile } from 'fs/promises';

export default function registerFSEvents(ipcMainInstance: IpcMain) {
  ipcMainInstance.handle('get-file', async (event, url: string): Promise<ArrayBuffer> => {
    return (await readFile(url)).buffer;
  });
}
