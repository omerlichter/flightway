import { inject, Injectable } from '@angular/core';
import { Theme } from '../types/theme.type';
import { DOCUMENT } from '@angular/common';

export abstract class ThemeService {
  public abstract switchTheme(theme: Theme): void;
}

export function ThemeServiceFactory(): ThemeService {
  if (window.electron) {
    return new ThemeElectronService();
  }

  return new ThemeWebService();
}

export class ThemeElectronService extends ThemeService {
  private readonly _document = inject(DOCUMENT);

  public switchTheme(theme: Theme): void {
    const linkElement = this._document.getElementById('app-theme') as HTMLLinkElement;
    linkElement.href = `${theme}.css`;
    window.electron.app.setAppDarkTheme(theme === 'drones-dark');
  }
}

export class ThemeWebService extends ThemeService {
  private readonly _document = inject(DOCUMENT);

  public switchTheme(theme: Theme): void {
    const linkElement = this._document.getElementById('app-theme') as HTMLLinkElement;
    linkElement.href = `${theme}.css`;
  }
}
