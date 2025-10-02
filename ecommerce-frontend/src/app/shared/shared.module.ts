import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SessionModalComponent } from './components/session-modal/session-modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [SessionModalComponent, AlertComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        ToastModule
    ],
    providers: [MessageService],
    exports: [SessionModalComponent, AlertComponent] 
})
export class SharedModule {}
