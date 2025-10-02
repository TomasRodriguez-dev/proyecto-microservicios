import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/auth/service/auth.service';

@Component({
    selector: 'app-session-modal',
    templateUrl: './session-modal.component.html',
    styleUrls: ['./session-modal.component.scss'],
    standalone: false
})
export class SessionModalComponent implements OnInit, OnDestroy {
    visible = false;
    countdown = 60; 
    private intervalId: any;

    private handler = () => {
        this.visible = true;
        this.startCountdown();
    };

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        window.addEventListener('session-expiring', this.handler);
    }

    ngOnDestroy(): void {
        window.removeEventListener('session-expiring', this.handler);
        this.clearCountdown();
    }

    extendSession() {
        this.auth.refresh().subscribe({
            next: () => {
                this.visible = false;
                this.clearCountdown();
            },
            error: () => this.logout()
        });
    }

    logout() {
        this.auth.logout();
        this.clearCountdown();
        window.location.href = '/auth/login';
    }

    private startCountdown() {
        this.countdown = 60;
        this.clearCountdown();

        this.intervalId = setInterval(() => {
            this.countdown--;
            if (this.countdown <= 0) {
                this.logout();
            }
        }, 1000);
    }

    private clearCountdown() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
