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
import { FSService } from '../../../../core/services/fs.service';
import { MissionPointsStore } from '../../../../core/store/mission/mission-points.store';
import { IdsMissionPoint } from '../../../../shared/types/ids-mission-point.type';
import { IdsEnrichedMissionPoint } from '../../../../shared/types/ids-enriched-mission-point.type';

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
export class MissionPlannerPageComponent {
  private _missionPointsStore = inject(MissionPointsStore);

  private _fsService = inject(FSService);
  private _$editableMapComponent = viewChild.required<EditableMap>(MapComponent);

  protected $missionPoints = this._missionPointsStore.entities;

  protected $enrichedMissionPoints = computed<Array<IdsEnrichedMissionPoint>>(() => {
    let prevPoint = this.$missionPoints()[0];

    return this.$missionPoints().map((point: IdsMissionPoint) => {
      const height = point.altitude - prevPoint.altitude;
      const distance = calcGeoDistance(point, prevPoint);
      const gradient = calcGradient(height, distance);
      const azimuth: number = (calcBearing(point, prevPoint) + 180) % 360;

      prevPoint = point;

      return {
        id: point.id,
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

  protected $selectedMissionPoint = signal<IdsMissionPoint | null>(null);

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

  protected onDrawMarkerActivated(): void {
    this._$editableMapComponent().drawMarker();
  }

  protected onMarkerAdded(mapPoint: IdsMissionPoint): void {
    this.$selectedMissionPoint.set(null);
    this._missionPointsStore.addMissionPoint(mapPoint);
  }

  protected onUpdateDataTable(missionMapPoints: Array<IdsMissionPoint>) {
    this.$selectedMissionPoint.set(null);
    this._missionPointsStore.setMissionPoints(missionMapPoints);
  }

  protected onSelectedMissionPoint(missionPoint: IdsMissionPoint | null) {
    this.$selectedMissionPoint.set(missionPoint);
  }
}
