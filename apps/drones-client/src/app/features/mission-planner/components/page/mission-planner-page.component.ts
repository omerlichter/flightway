import { ChangeDetectionStrategy, Component, computed, effect, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionPlannerPageLayoutComponent } from '../layouts/mission-planner-page-layout/mission-planner-page-layout.component';
import { PlannerMapComponent } from '../organisms/planner-map/planner-map.component';
import { EditableMap } from '../../../../shared/types/editable-map.type';
import { PlannerToolbarComponent } from '../molecules/planner-toolbar/planner-toolbar.component';
import { PlannerDataTableComponent } from '../molecules/planner-data-table/planner-data-table.component';
import { calcBearing, calcGeoDistance, calcGradient, MapPoint, MissionPoint, rad2deg } from '@drones-app/shared';

@Component({
  selector: 'app-mission-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    MissionPlannerPageLayoutComponent,
    PlannerMapComponent,
    PlannerDataTableComponent,
    PlannerToolbarComponent,
  ],
  templateUrl: './mission-planner-page.component.html',
  styleUrl: './mission-planner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlannerPageComponent implements OnInit {
  private _$editableMapComponent = viewChild.required<EditableMap>(PlannerMapComponent);

  protected $missionMapPoints = signal<Array<MapPoint>>([]);
  protected $homePoint = signal<MapPoint>({
    latitude: 32.0766323,
    longitude: 35.0839419,
    altitude: 350.7099914,
  });
  protected $missionPoints = computed<Array<MissionPoint>>(() => {
    console.log('update');
    let prevPoint = this.$homePoint();

    return this.$missionMapPoints().map((point: MapPoint) => {
      const height = point.altitude - prevPoint.altitude;
      const distance = calcGeoDistance(point, prevPoint);
      console.log(height, distance);
      const gradient = calcGradient(height, distance);
      const azimuth: number = (calcBearing(point, prevPoint) + 180) % 360;

      prevPoint = point;

      return {
        latitude: point.latitude,
        longitude: point.longitude,
        altitude: point.altitude,
        gradient: gradient * 100,
        angle: rad2deg * Math.atan(gradient),
        distance: Math.sqrt(distance * distance + height * height),
        azimuth,
      };
    });
  });

  public ngOnInit(): void {
    this.onMarkerAdded({ latitude: 31.88473061, longitude: 34.82609668, altitude: 100 });
    this.onMarkerAdded({ latitude: 31.88968952, longitude: 34.827940782, altitude: 50 });
  }

  protected onDrawMarker(): void {
    this._$editableMapComponent().drawMarker();
  }

  protected onMarkerAdded(mapPoint: MapPoint): void {
    this.$missionMapPoints.update((value: Array<MapPoint>) => [...value, mapPoint]);
  }

  protected onUpdateDataTable(missionMapPoints: Array<MapPoint>) {
    this.$missionMapPoints.set([...missionMapPoints]);
  }
}
