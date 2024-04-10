import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme, defaultTheme } from "../models/theme.model";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    channel = new BroadcastChannel('bingo-theme-channel');
    theme$ = new BehaviorSubject<Theme>(defaultTheme);

    private readonly _themeKey = 'bingo-theme';

    constructor() {
        this.channel.addEventListener('message', event => {
            const theme = event.data as Theme;
            this.theme$.next(theme);
        });

        this.theme$.subscribe(theme => {
            document.documentElement.style.setProperty('--primary-color', theme.backgroundColor);
            document.documentElement.style.setProperty('--text-color', theme.textColor);
        });

        this.loadData();
    }

    private loadData(): void {
        const json = localStorage.getItem(this._themeKey);
        if (json) {
            try {
                const theme = JSON.parse(json) as Theme;
                this.updateTheme(theme);
            } catch (error) { }
        }
    }

    updateTheme(theme: Theme): void {
        this.channel.postMessage(theme);
        this.theme$.next(theme);
        localStorage.setItem(this._themeKey, JSON.stringify(theme));
    }
}
