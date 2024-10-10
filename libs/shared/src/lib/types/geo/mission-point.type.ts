import { MapPoint } from './map-point.type';
import { MissionPointCategory } from './mission-point-category.type';
import { missionPointSpecial } from './mission-point-special.type';

export interface MissionPoint extends MapPoint {
  readonly special: missionPointSpecial;
  readonly category: MissionPointCategory;
}
