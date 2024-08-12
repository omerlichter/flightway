import { IpcMain } from 'electron';
import { environment } from '../../environments/environment';

export default function registerAppEvents(ipcMainInstance: IpcMain) {
  ipcMainInstance.handle('get-app-version', (): string => {
    console.log(`Fetching application version... [v${environment.version}]`);

    return environment.version;
  });

  ipcMainInstance.handle('get-app-platform', (): string => {
    console.log(`Fetching application platform... [${process.platform}]`);

    return process.platform;
  });
}
