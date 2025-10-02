import { Injectable, inject } from '@angular/core';

const STORAGE_KEY = 'theme'; // 'light' | 'dark'

@Injectable({ providedIn: 'root' })
export class ThemeService {

    private doc = document;

    initTheme() {
        // Por defecto: claro
        const saved = (localStorage.getItem(STORAGE_KEY) || 'light') as 'light' | 'dark';
        this.apply(saved);
    }

    toggle() {
        const next = this.isDark() ? 'light' : 'dark';
        this.apply(next);
    }

    isDark(): boolean {
        return this.doc.documentElement.classList.contains('dark');
    }

    private apply(mode: 'light' | 'dark') {
        const el = this.doc.documentElement; 
        el.classList.toggle('dark', mode === 'dark');
        localStorage.setItem(STORAGE_KEY, mode);
    }
}
