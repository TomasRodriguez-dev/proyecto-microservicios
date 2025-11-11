import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TablaDinamicaModule } from '../../shared/components/tabla-dinamica/tabla-dinamica.module';
import { ProductosComponent } from './components/productos.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { AppAlertService } from '../../shared/service/alert.service';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        ProductosComponent
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
        DividerModule,
        ProductosRoutingModule,
        TablaDinamicaModule,
        ConfirmDialogModule
    ],
    providers: [FormBuilder, AppAlertService, ConfirmationService, DialogService],
})
export class ProductosModule {}
