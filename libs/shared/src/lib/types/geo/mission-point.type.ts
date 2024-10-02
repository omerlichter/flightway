import { MapPoint } from './map-point.type';
import { MissionPointCategory } from './mission-point-category.type';

export interface MissionPoint extends MapPoint {
  readonly category: MissionPointCategory;
}
