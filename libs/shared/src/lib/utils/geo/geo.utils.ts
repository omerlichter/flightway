import { MapPoint } from '../../types/geo/map-point.type';
import { deg2rad, rad2deg } from '../math/math-helper.utils';

export function calcGeoDistance(pointA: MapPoint, pointB: MapPoint): number {
  const d = pointA.latitude * 0.017453292519943295;
  const num2 = pointA.longitude * 0.017453292519943295;
  const num3 = pointB.latitude * 0.017453292519943295;
  const num4 = pointB.longitude * 0.017453292519943295;
  const num5 = num4 - num2;
  const num6 = num3 - d;
  const num7 = Math.pow(Math.sin(num6 / 2.0), 2.0) + Math.cos(d) * Math.cos(num3) * Math.pow(Math.sin(num5 / 2.0), 2.0);
  const num8 = 2.0 * Math.atan2(Math.sqrt(num7), Math.sqrt(1.0 - num7));
  return 6371 * num8 * 1000.0; // M
}

export function calcBearing(pointA: MapPoint, pointB: MapPoint): number {
  const latitude1 = deg2rad * pointA.latitude;
  const latitude2 = deg2rad * pointB.latitude;
  const longitudeDifference = deg2rad * (pointB.longitude - pointA.longitude);

  const y = Math.sin(longitudeDifference) * Math.cos(latitude2);
  const x =
    Math.cos(latitude1) * Math.sin(latitude2) -
    Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longitudeDifference);

  return (rad2deg * Math.atan2(y, x) + 360) % 360;
}

export function calcGradientP(pointA: MapPoint, pointB: MapPoint): number {
  const geoDistance = calcGeoDistance(pointA, pointB);
  const height = pointA.altitude - pointB.altitude;
  return height / geoDistance;
}

export function calcGradient(height: number, distance: number): number {
  return height / distance;
}

export function calcAngle(pointA: MapPoint, pointB: MapPoint, heading: number): number {
  let angle = calcBearing(pointA, pointB) - heading;
  if (angle < -180.0) {
    angle += 360.0;
  }
  if (angle > 180.0) {
    angle -= 360.0;
  }
  return angle;
}
