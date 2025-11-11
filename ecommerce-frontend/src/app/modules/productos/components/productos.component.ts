import { Component, OnInit, ViewChild } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { TablaDinamicaComponent } from "../../../shared/components/tabla-dinamica/components/tabla-dinamica.component";
import { IAccionTabla } from "../../../shared/components/tabla-dinamica/model/accion.interface";
import { DialogService } from "primeng/dynamicdialog";
import { AppAlertService } from "../../../shared/service/alert.service";
import { ConfirmationService } from "primeng/api";
import { IProducto } from "../model/producto.model";
import { formatCurrency } from "../../../utils/format.helper";

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
    standalone: false
})
export class ProductosComponent implements OnInit {
    // ==== Tabla Dinamico ====
    env: string = environment.api.productos;
    headers: string[] = ['ID', 'Nombre', 'Precio', 'Stock', 'Activo'];
    columns: string[] = ['id', 'name', 'price', 'stock', 'isActive'];
    formatters: Record<string, (value: any) => any> = {
        isActive: (v: boolean) => (v ? 'Sí' : 'No'),
        price: formatCurrency
    };

    actions: IAccionTabla[] = [];
    
    @ViewChild(TablaDinamicaComponent) tablaDinamica!: TablaDinamicaComponent;

    constructor(
        private dialogService: DialogService,
        private _alertService: AppAlertService,
        private _confirmationService: ConfirmationService,
    ) {}

    ngOnInit(): void {
        this.actions = [
            {
                label: 'Editar',
                icon: 'pi pi-pencil',
                action: (row) => this.onEdit(row)
            },
            {
                label: 'Desactivar',
                icon: 'pi pi-ban',
                color: 'text-red-500',
                mostrarSi: (row) => row.isActive === 'Sí',
                action: (row) => this.onDeactivate(row)
            },
            {
                label: 'Activar',
                icon: 'pi pi-check',
                color: 'text-green-500',
                mostrarSi: (row) => row.isActive === 'No',
                action: (row) => this.onActivate(row)
            }
        ];
    }

    onCreate() {
        // const ref = this.dialogService.open(SaveUsuarioComponent, {
        //     header: 'Crear Usuario',
        //     styleClass: 'p-fluid',
        //     modal: true,
        //     dismissableMask: false,
        //     focusOnShow: false,
        //     closable: true,
        //     breakpoints: {
        //         '960px': '85vw',
        //         '640px': '90vw'
        //     },
        // });
    
        // ref?.onClose.subscribe((result: { ok: boolean; mensaje: string }) => {
        //     if (result?.ok) {
        //         this._alertService.success(result.mensaje);
        //         this.tablaDinamica.loadData({ first: 0, rows: 10 });
        //     }
        // });
    }

    onEdit(row: any) {
        // const ref = this.dialogService.open(SaveUsuarioComponent, {
        //     header: 'Editar Usuario',
        //     data: row,
        //     styleClass: 'p-fluid',
        //     modal: true,
        //     dismissableMask: false,
        //     focusOnShow: false,
        //     closable: true,
        //     breakpoints: {
        //         '960px': '85vw',
        //         '640px': '90vw'
        //     },
        // });
    
        // ref?.onClose.subscribe((result: { ok: boolean; mensaje: string }) => {
        //     if (result?.ok) {
        //         this._alertService.success(result.mensaje);
        //         this.tablaDinamica.loadData({ first: 0, rows: 10 });
        //     }
        // });
    }

    onDeactivate(row: IProducto) {
        this._confirmationService.confirm({
            message: `¿Seguro que deseas desactivar el producto <b>${row.name}</b>?`,
            header: 'Confirmar desactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, desactivar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-sm p-button-danger',   
            rejectButtonStyleClass: 'p-button-sm p-button-secondary', 
            accept: () => {
                this.updateStatus(row.id, false);
            }
        });
    }

    onActivate(row: IProducto) {
        this._confirmationService.confirm({
            message: `¿Seguro que deseas activar el producto <b>${row.name}</b>?`,
            header: 'Confirmar activación',
            icon: 'pi pi-check-circle',
            acceptLabel: 'Sí, activar',
            rejectLabel: 'Cancelar',
            acceptButtonStyleClass: 'p-button-sm p-button-success',  
            rejectButtonStyleClass: 'p-button-sm p-button-secondary',
            accept: () => {
                this.updateStatus(row.id, true);
            }
        });
    }

    private updateStatus(id: number, isActive: boolean) {
        // this._usuariosService.updateUsuario(id, { isActive }).subscribe({
        //     next: () => {
        //         this._alertService.success(
        //         `Usuario ${isActive ? 'activado' : 'desactivado'} correctamente`
        //         );
        //         this.tablaDinamica.loadData({ first: 0, rows: 10 });
        //     },
        //     error: (err) => {
        //         console.error(err);
        //         this._alertService.error('No se pudo actualizar el estado del usuario');
        //     }
        // });
    }
}