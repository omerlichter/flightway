import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { AppService, AppServiceFactory } from './core/services/app.service';
import { MapTileService, MapTileServiceFactory } from './core/services/map-tile.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideAnimations(),
    { provide: AppService, useFactory: AppServiceFactory },
    { provide: MapTileService, useFactory: MapTileServiceFactory },
  ],
};
