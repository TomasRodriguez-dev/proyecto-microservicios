import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { DialogService } from 'primeng/dynamicdialog';
import { AppAlertService } from '../../shared/service/alert.service';
import { SelectModule } from 'primeng/select';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/perfil.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
    declarations: [
        PerfilComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterOutlet,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        SelectModule, 
        DividerModule,
        ConfirmDialog,
        PopoverModule,
        PerfilRoutingModule,
        CardModule,
        AvatarModule,
        TagModule,
        DatePickerModule,
        TooltipModule
    ],
    providers: [FormBuilder, DialogService, AppAlertService, ConfirmationService]
})
export class PerfilModule {}