import { MapPoint } from './map-point.type';

export interface MissionPoint extends MapPoint {
  gradient: number;
  angle: number;
  distance: number;
  azimuth: number;
}
