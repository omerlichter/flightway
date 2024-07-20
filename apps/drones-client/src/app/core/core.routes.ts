import { Route } from '@angular/router';
import { MainComponent } from './components/page/main.component';

export const coreRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
    loadChildren: () =>
      import('../features/mission-planner/mission-planner.routes').then((mod) => mod.missionPlannerRoutes),
  },
];
