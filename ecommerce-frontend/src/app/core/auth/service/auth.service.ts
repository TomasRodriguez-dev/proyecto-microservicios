import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/model/api-response.model';
import { IUsuario } from '../../../modules/usuarios/model/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private endpoints = environment.api.auth;
    private sessionTimer: any;
    private userProfile: IUsuario | null = null;  

    constructor(private http: HttpClient) {}

    // === LOGIN ===
    login(credentials: { email: string; password: string }) {
        return this.http.post<any>(this.endpoints.login, credentials).pipe(
            tap(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }
                if (res.result?.[0]?.refresh_token) {
                    localStorage.setItem('refresh_token', res.result[0].refresh_token);
                }

                this.setSessionTimer();

                this.getPerfil().subscribe(profile => {
                    this.userProfile = profile;
                    localStorage.setItem('user', JSON.stringify(profile));
                });
            })
        );
    }

    // === REGISTER ===
    register(data: any) {
        return this.http.post<ApiResponse>(this.endpoints.register, data);
    }

    // === PERFIL ===
    getPerfil() {
        return this.http.get<ApiResponse>(this.endpoints.perfil).pipe(
            map(res => res.result?.[0] ?? null)  
        );
    }

    getUser(): any {
        if (this.userProfile) return this.userProfile;

        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    }

    setUser(user: IUsuario): void {
        this.userProfile = user;
        localStorage.setItem('user', JSON.stringify(user));
    }

    // === REFRESH TOKEN ===
    refresh(): Observable<{ token: string }> {
        const refresh_token = localStorage.getItem('refresh_token');
        return this.http.post<{ token: string }>(this.endpoints.refresh, { refresh_token }).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);
                this.setSessionTimer();
            })
        );
    }

    // === LOGOUT ===
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        this.userProfile = null;
        if (this.sessionTimer) clearTimeout(this.sessionTimer);
    }

    // === TOKEN ===
    get token() {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        const token = this.token;
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    }

    // === SESIÓN Y TIMER ===
    private getTokenExpiration(): number | null {
        const token = this.token;
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000;
        } catch {
            return null;
        }
    }

    setSessionTimer() {
        const exp = this.getTokenExpiration();
        if (!exp) {
            console.warn('[AuthService] No se pudo obtener exp del token');
            return;
        }

        const timeLeft = exp - Date.now();
        const timeout = timeLeft - 60_000; // un minuto antes de expirar

        if (timeout > 0) {
            this.sessionTimer = setTimeout(() => {
                const event = new CustomEvent('session-expiring');
                window.dispatchEvent(event);

                // Cuenta regresiva opcional
                let countdown = 60;
                const interval = setInterval(() => {
                    countdown--;
                    if (countdown <= 0) clearInterval(interval);
                }, 1000);
            }, timeout);
        } else {
            const event = new CustomEvent('session-expiring');
            window.dispatchEvent(event);
        }
    }
}
