import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AppAlertService {
    constructor(private message: MessageService) {}

    success(detail: string, summary: string = 'Éxito') {
        this.message.add({
            key: 'app',   
            severity: 'success',
            summary,
            detail,
            life: 4000
        });
    }

    error(detail: string, summary: string = 'Error') {
        this.message.add({
            key: 'app',
            severity: 'error',
            summary,
            detail,
            life: 5000
        });
    }

    warn(detail: string, summary: string = 'Atención') {
        this.message.add({
            key: 'app',
            severity: 'warn',
            summary,
            detail,
            life: 5000
        });
    }

    info(detail: string, summary: string = 'Info') {
        this.message.add({
            key: 'app',
            severity: 'info',
            summary,
            detail,
            life: 4000
        });
    }
}

