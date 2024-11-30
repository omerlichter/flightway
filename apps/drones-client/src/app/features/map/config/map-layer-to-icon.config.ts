import { MapLayerType } from '../types/map-layer.type';

export const mapLayerToIcon: { [k in MapLayerType]: string } = {
  tile: 'pi pi-fw pi-map',
  height: 'pi pi-fw pi-chart-bar',
  overlay: 'pi pi-fw pi-image',
} as const;
