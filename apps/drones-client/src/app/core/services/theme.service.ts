import { inject, Injectable } from '@angular/core';
import { Theme } from '../types/theme.type';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);

  public switchTheme(theme: Theme): void {
    const linkElement = this._document.getElementById('app-theme') as HTMLLinkElement;
    linkElement.href = `${theme}.css`;
  }
}
