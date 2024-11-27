import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionPlannerPageLayoutComponent } from '../layouts/mission-planner-page-layout/mission-planner-page-layout.component';
import { MapComponent } from '../../../map/components/organisms/planner-map/map.component';
import { EditableMap } from '../../../map/classes/editable-map.type';
import { PlannerToolbarComponent } from '../molecules/planner-toolbar/planner-toolbar.component';
import { PlannerDataTableComponent } from '../molecules/planner-data-table/planner-data-table.component';
import {
  calcBearing,
  calcGeoDistance,
  calcGradient,
  EnrichedMissionPoint,
  rad2deg,
  MissionPoint,
} from '@drones-app/shared';
import { FSService } from 'apps/drones-client/src/app/core/services/fs.service';

@Component({
  selector: 'app-mission-planner-page',
  standalone: true,
  imports: [
    CommonModule,
    MissionPlannerPageLayoutComponent,
    MapComponent,
    PlannerDataTableComponent,
    PlannerToolbarComponent,
  ],
  templateUrl: './mission-planner-page.component.html',
  styleUrl: './mission-planner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionPlannerPageComponent implements OnInit {
  private _fsService = inject(FSService);
  private _$editableMapComponent = viewChild.required<EditableMap>(MapComponent);

  protected $missionPoints = signal<Array<MissionPoint>>([
    {
      special: 'HOME',
      category: 'TAKEOFF',
      latitude: 32.0766323,
      longitude: 35.0839419,
      altitude: 350.7099914,
    },
  ]);

  protected $enrichedMissionPoints = computed<Array<EnrichedMissionPoint>>(() => {
    let prevPoint = this.$missionPoints()[0];

    return this.$missionPoints().map((point: MissionPoint) => {
      const height = point.altitude - prevPoint.altitude;
      const distance = calcGeoDistance(point, prevPoint);
      const gradient = calcGradient(height, distance);
      const azimuth: number = (calcBearing(point, prevPoint) + 180) % 360;

      prevPoint = point;

      return {
        special: point.special,
        latitude: point.latitude,
        longitude: point.longitude,
        altitude: point.altitude,
        category: point.category,
        gradient: gradient * 100,
        angle: rad2deg * Math.atan(gradient),
        distance: Math.sqrt(distance * distance + height * height),
        azimuth,
      };
    });
  });

  protected $selectedMissionPointIndex = signal<number | null>(null);

  public ngOnInit(): void {
    this.onMarkerAdded({
      special: 'REGULAR',
      category: 'WAYPOINT',
      latitude: 31.88473061,
      longitude: 34.82609668,
      altitude: 100,
    });
    this.onMarkerAdded({
      special: 'REGULAR',
      category: 'WAYPOINT',
      latitude: 31.88968952,
      longitude: 34.827940782,
      altitude: 50,
    });
  }

  protected onDropMap(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;

    if (files) {
      for (const file of files) {
        console.log(this._fsService.getFilePath(file));
      }
    }
  }

  protected onDrawMarker(): void {
    this._$editableMapComponent().drawMarker();
  }

  protected onMarkerAdded(mapPoint: MissionPoint): void {
    this.$missionPoints.update((value: Array<MissionPoint>) => [...value, mapPoint]);
  }

  protected onUpdateDataTable(missionMapPoints: Array<MissionPoint>) {
    this.$missionPoints.set([...missionMapPoints]);
  }

  protected onMakerClicked(index: number | null) {
    this.$selectedMissionPointIndex.set(index);
  }

  protected onSelectMissionPointIndex(index: number | null) {
    this.$selectedMissionPointIndex.set(index);
  }
}
