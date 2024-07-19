import { Route } from '@angular/router';
import { coreRoutes } from './core/core.routes';

export const appRoutes: Route[] = [{ path: '', children: coreRoutes }];
