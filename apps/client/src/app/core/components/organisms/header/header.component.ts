import { ChangeDetectionStrategy, Component, computed, effect, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ThemeService } from '../../../services/theme.service';
import { Theme } from '../../../types/theme.type';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ToggleButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _themeService = inject(ThemeService);
  private readonly _appService = inject(AppService);

  protected readonly $isLightMode = model<boolean>(false);
  protected readonly $appVersion = this._appService.appVersion;
  protected readonly $appPlatform = this._appService.appPlatform;

  private readonly $themeMode = computed<Theme>(() => {
    return this.$isLightMode() ? 'flightway-light' : 'flightway-dark';
  });

  protected readonly appTitle = 'FLIGHTWAY';

  constructor() {
    effect(() => {
      this._themeService.switchTheme(this.$themeMode());
    });
  }
}
