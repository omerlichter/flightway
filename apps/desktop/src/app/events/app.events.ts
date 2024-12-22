import { IpcMain } from 'electron';
import { environment } from '../../environments/environment';
import { nativeTheme } from 'electron/main';
import App from '../app';

export default function registerAppEvents(ipcMainInstance: IpcMain) {
  ipcMainInstance.handle('get-app-version', (): string => {
    console.log(`Fetching application version... [v${environment.version}]`);

    return environment.version;
  });

  ipcMainInstance.handle('get-app-platform', (): string => {
    console.log(`Fetching application platform... [${process.platform}]`);

    return process.platform;
  });

  ipcMainInstance.handle('set-app-dark-theme', (event, darkTheme: boolean): void => {
    if (darkTheme) {
      nativeTheme.themeSource = 'dark';
      App.mainWindow.setTitleBarOverlay({
        color: 'hsl(215, 28%, 10%)',
        symbolColor: '#ffffff', // symbol color here
      });
    } else {
      nativeTheme.themeSource = 'light';
      App.mainWindow.setTitleBarOverlay({
        color: 'hsl(210, 20%, 94%)',
        symbolColor: '#000000', // symbol color here
      });
    }
  });
}
