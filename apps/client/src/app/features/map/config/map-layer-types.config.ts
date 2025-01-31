import { MapLayerType } from '../types/map-layer.type';

export const mapLayerTypes: Array<MapLayerType> = ['tile', 'height', 'overlay'];
export const extToMapLayerType: Record<string, MapLayerType> = {
  png: 'tile',
  tif: 'height',
};
