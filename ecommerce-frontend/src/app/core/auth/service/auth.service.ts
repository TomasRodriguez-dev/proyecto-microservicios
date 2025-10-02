import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private endpoints = environment.api.auth;
    private sessionTimer: any;

    constructor(private http: HttpClient) {}

    login(credentials: { email: string; password: string }) {
        return this.http.post<any>(
            this.endpoints.login,
            credentials
        ).pipe(
            tap(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                }

                if (res.result?.[0]?.refresh_token) {
                    localStorage.setItem('refresh_token', res.result[0].refresh_token);
                }

                this.setSessionTimer();
            })
        );
    }

    register(data: any) {
        return this.http.post<ApiResponse>(this.endpoints.register, data);
    }

    getPerfil() {
        return this.http.get(this.endpoints.perfil);
    }

    refresh(): Observable<{ token: string }> {
        const refresh_token = localStorage.getItem('refresh_token');
        return this.http.post<{ token: string }>(
            this.endpoints.refresh,
            { refresh_token }
        ).pipe(
            tap(res => {
                localStorage.setItem('token', res.token);
                this.setSessionTimer();
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        if  (this.sessionTimer) clearTimeout(this.sessionTimer);
    }

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
  console.log(`[AuthService] Token expira en: ${(timeLeft / 1000).toFixed(0)}s`);

  // disparamos evento 1 min antes (configurable)
  const timeout = timeLeft - 60_000;

  if (timeout > 0) {
    console.log(`[AuthService] Programando aviso en ${(timeout / 1000).toFixed(0)}s`);

    this.sessionTimer = setTimeout(() => {
      console.log('[AuthService] ⚠️ Token por expirar → disparo evento session-expiring');
      const event = new CustomEvent('session-expiring');
      window.dispatchEvent(event);

      // además, mientras está abierto el modal, podemos loguear countdown
      let countdown = 60;
      const interval = setInterval(() => {
        countdown--;
        console.log(`[SessionModal] quedan ${countdown}s`);
        if (countdown <= 0) clearInterval(interval);
      }, 1000);

    }, timeout);
  } else {
    console.warn('[AuthService] El token ya está cerca de expirar, disparando modal inmediato');
    const event = new CustomEvent('session-expiring');
    window.dispatchEvent(event);
  }
}

}
