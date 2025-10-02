import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    standalone: false
})
export class AlertComponent {
    constructor(public messageService: MessageService) {}

    iconFor(severity: string): string {
        switch (severity) {
            case 'success': return 'pi-check-circle';                
            case 'info':    return 'pi-info-circle';
            case 'warn':    return 'pi-exclamation-triangle';
            case 'error':   return 'pi-times-circle';
            default:        return 'pi-info-circle';
        }
    }
}
