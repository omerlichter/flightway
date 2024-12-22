import { EnrichedMissionPoint, MissionPoint } from '@flightway-app/shared';
import { ColumnConfig } from '../types/column-config.type';

export const PlannerDataTableHomeRowConfig: Array<ColumnConfig<MissionPoint>> = [
  {
    field: 'category',
    header: 'Type',
    editable: false,
  },
  {
    field: 'latitude',
    header: 'Latitude',
    editable: true,
  },
  {
    field: 'longitude',
    header: 'Longitude',
    editable: true,
  },
  {
    field: 'altitude',
    header: 'Altitude',
    editable: true,
    units: 'm',
  },
];

export const PlannerDataTableRowConfig: Array<ColumnConfig<EnrichedMissionPoint>> = [
  {
    field: 'category',
    header: 'Type',
    editable: true,
  },
  {
    field: 'latitude',
    header: 'Latitude',
    editable: true,
  },
  {
    field: 'longitude',
    header: 'Longitude',
    editable: true,
  },
  {
    field: 'altitude',
    header: 'Altitude',
    editable: true,
    units: 'm',
  },
  {
    field: 'gradient',
    header: 'Gradient',
    editable: false,
  },
  {
    field: 'angle',
    header: 'Angle',
    editable: false,
  },
  {
    field: 'distance',
    header: 'Distance',
    editable: false,
    units: 'm',
  },
  {
    field: 'azimuth',
    header: 'Azimuth',
    editable: false,
  },
];
