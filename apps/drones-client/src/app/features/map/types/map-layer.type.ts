type BaseMapLayer = {
  name: string;
  url: string;
  selected: boolean;
};

export type TileMapLayer = BaseMapLayer & {
  type: 'tile';
};

export type OverlayMapLayer = BaseMapLayer & {
  type: 'overlay';
  opacity: number;
};

export type HeightMapLayer = BaseMapLayer & {
  type: 'height';
  opacity: number;
};

export type MapLayer = TileMapLayer | HeightMapLayer | OverlayMapLayer;
export type MapLayerType = MapLayer['type'];
