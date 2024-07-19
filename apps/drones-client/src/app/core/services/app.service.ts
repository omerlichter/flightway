import { Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

export abstract class AppService {
  public abstract appVersion: Signal<string>;
}

export function AppServiceFactory(): AppService {
  if (window.electron) {
    return new AppElectronService();
  }

  return new AppWebService();
}

@Injectable()
export class AppElectronService extends AppService {
  public readonly appVersion = toSignal(from(window.electron.getAppVersion()), { initialValue: '1.0.0' });
}

@Injectable()
export class AppWebService extends AppService {
  public readonly appVersion = signal('web');
}
