import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isLight: boolean = true;

    constructor(
        private overlay: OverlayContainer
    ) {
        this.isLight = this.prefersLightTheme();
        this.registerThemeListener();
        this.setOverlayContainerTheme();
    }
    
    toggleTheme(): void {
        this.isLight = !this.isLight;
        this.setOverlayContainerTheme();
    }

    prefersLightTheme(): boolean {
        if (window?.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: light)').matches;
        }

        return true;
    }

    registerThemeListener(): void {
        if (window?.matchMedia) {
            window.matchMedia('(prefers-color-scheme: light)')
                .addEventListener('change', (e: MediaQueryListEvent) =>
                    this.isLight = e.matches
                );
        }
    }

    setOverlayContainerTheme() {
        if (this.isLight) {
            this.overlay
                .getContainerElement()
                .classList
                .remove('app-dark');

            this.overlay
                .getContainerElement()
                .classList
                .add('app-light');
        } else {
            this.overlay
                .getContainerElement()
                .classList
                .remove('app-light');

            this.overlay
                .getContainerElement()
                .classList
                .add('app-dark');
        }
    }
}