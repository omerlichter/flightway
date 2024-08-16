import { MapPoint } from './map-point.type';

export interface MissionPoint extends MapPoint {
  readonly gradient: number;
  readonly angle: number;
  readonly distance: number;
  readonly azimuth: number;
}
