import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-map-page-layout',
  standalone: true,
  imports: [CommonModule, SplitterModule],
  templateUrl: './map-page-layout.component.html',
  styleUrl: './map-page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageLayoutComponent {}
