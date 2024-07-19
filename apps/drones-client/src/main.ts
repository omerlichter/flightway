import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ApiContextBridge } from '@drones-app/shared';

declare global {
  interface Window {
    electron: ApiContextBridge;
  }
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
