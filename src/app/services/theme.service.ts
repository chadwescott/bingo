import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { fonts } from "../models/font.model";
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

        this.theme$.subscribe(theme => this.updateDocumentStyles(theme));

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
        theme.font = fonts.find(f => f.name === theme.font.name) ?? fonts[0];
        this.channel.postMessage(theme);
        this.theme$.next(theme);
        localStorage.setItem(this._themeKey, JSON.stringify(theme));
    }

    updateDocumentStyles(theme: Theme): void {
        document.documentElement.style.setProperty('--font-family', theme.font.fontFamily);
        document.documentElement.style.setProperty('--primary-color', theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', theme.textColor);
        document.documentElement.style.setProperty('--card-color', theme.cardColor);
        document.documentElement.style.setProperty('--text-transform', theme.uppercase ? 'uppercase' : 'none');
        document.documentElement.style.setProperty('--text-shadow', theme.textShadow ? 'var(--text-shadow-on)' : 'none');
        document.documentElement.style.setProperty('--font-weight', theme.bold ? 'bold' : 'none');
    }
}
