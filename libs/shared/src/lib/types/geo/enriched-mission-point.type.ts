import { MissionPoint } from './mission-point.type';

export interface EnrichedMissionPoint extends MissionPoint {
  readonly gradient: number;
  readonly angle: number;
  readonly distance: number;
  readonly azimuth: number;
}
