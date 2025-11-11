import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaRoutingModule } from './tabla-dinamica-routing.module';
import { TablaDinamicaComponent } from './components/tabla-dinamica.component';
import { TablaDinamicaService } from './service/tabla-dinamica.service';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { PopoverModule } from 'primeng/popover';

@NgModule({
    declarations: [
        TablaDinamicaComponent
    ],
    imports: [
        CommonModule,
        TablaDinamicaRoutingModule,
        TableModule,
        PaginatorModule,
        ProgressSpinnerModule,
        ButtonModule,
        TieredMenuModule,
        PopoverModule
    ],
    exports: [TablaDinamicaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [TablaDinamicaService]
})
export class TablaDinamicaModule {}