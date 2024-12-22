import { patchState, signalStore, type, withHooks, withMethods, withState } from '@ngrx/signals';
import { addEntity, entityConfig, setAllEntities, withEntities } from '@ngrx/signals/entities';
import { IdsMissionPoint } from '../../../shared/types/ids-mission-point.type';

type MissionPointsState = {};

const initialState: MissionPointsState = {};

const missionPointConfig = entityConfig({
  entity: type<IdsMissionPoint>(),
});

export const MissionPointsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities(missionPointConfig),
  withMethods((store) => ({
    addMissionPoint(missionPoint: IdsMissionPoint): void {
      patchState(store, addEntity(missionPoint));
    },
    setMissionPoints(missionPoints: Array<IdsMissionPoint>): void {
      patchState(store, setAllEntities(missionPoints));
    },
  })),
  withHooks({
    onInit(store) {
      store.addMissionPoint({
        id: crypto.randomUUID(),
        special: 'HOME',
        category: 'TAKEOFF',
        latitude: 32.0766323,
        longitude: 35.0839419,
        altitude: 350,
      });
    },
  })
);
