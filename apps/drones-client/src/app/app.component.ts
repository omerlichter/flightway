import { Component, computed, effect, inject, model, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ThemeService } from './shared/services/theme.service';
import { Theme } from './shared/types/theme.type';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, InputSwitchModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _themeService = inject(ThemeService);

  protected readonly $isLightMode = model<boolean>(true);

  private readonly $themeMode = computed<Theme>(() => {
    return this.$isLightMode() ? 'drones-light' : 'drones-dark';
  });

  protected title = 'drones-client';

  constructor() {
    effect(() => {
      console.log(this.$themeMode());
      this._themeService.switchTheme(this.$themeMode());
    });
  }

  public async ngOnInit() {
    this.title = await window.electron.getAppVersion();
  }
}
