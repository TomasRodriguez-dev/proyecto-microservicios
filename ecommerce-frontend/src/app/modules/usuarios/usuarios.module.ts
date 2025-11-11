import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './components/usuarios.component';
import { TablaDinamicaModule } from '../../shared/components/tabla-dinamica/tabla-dinamica.module';
import { SaveUsuarioComponent } from './components/save-usuario/save-usuario.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AppAlertService } from '../../shared/service/alert.service';
import { SelectModule } from 'primeng/select';
import { UsuariosService } from './service/usuarios.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PopoverModule } from 'primeng/popover';

@NgModule({
    declarations: [
        UsuariosComponent,
        SaveUsuarioComponent
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
        UsuariosRoutingModule,
        ConfirmDialog,
        PopoverModule,
        TablaDinamicaModule,
    ],
    providers: [FormBuilder, DialogService, AppAlertService, UsuariosService, ConfirmationService]
})
export class UsuariosModule {}
