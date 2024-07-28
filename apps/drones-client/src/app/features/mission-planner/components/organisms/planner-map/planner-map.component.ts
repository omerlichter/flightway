import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, map, tileLayer, marker, latLngBounds } from 'leaflet';

@Component({
  selector: 'app-planner-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planner-map.component.html',
  styleUrl: './planner-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlannerMapComponent implements AfterViewInit {
  private map!: Map;
  private markers: L.Marker[] = [
    marker([31.9539, 35.9106]), // Amman
    marker([32.5568, 35.8469]), // Irbid
  ];

  public ngAfterViewInit(): void {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = map('map', { layers: this.markers });
    tileLayer(baseMapURl).addTo(this.map);

    const bounds = latLngBounds(this.markers.map((marker) => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }
}
