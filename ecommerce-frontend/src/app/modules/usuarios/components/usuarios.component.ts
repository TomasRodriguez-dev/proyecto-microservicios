import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { IAccionTabla } from "../../../shared/components/tabla-dinamica/model/accion.interface";
import { DialogService } from "primeng/dynamicdialog";
import { SaveUsuarioComponent } from "./save-usuario/save-usuario.component";
import { TablaDinamicaComponent } from "../../../shared/components/tabla-dinamica/components/tabla-dinamica.component";
import { AppAlertService } from "../../../shared/service/alert.service";
import { ConfirmationService } from "primeng/api";
import { UsuariosService } from "../service/usuarios.service";
import { IUsuario } from "../model/usuario.model";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: false
})
export class UsuariosComponent implements OnInit {
  // ==== Tabla Dinamica ====
  env: string = environment.api.usuarios;
  headers: string[] = ['ID', 'Nombre', 'Apellido', 'Email', 'Activo'];
  columns: string[] = ['id', 'firstName', 'lastName', 'email', 'isActive'];
  formatters: Record<string, (value: any) => any> = {
    isActive: (v: boolean) => (v ? 'Sí' : 'No')
  };
  actions: IAccionTabla[] = [];

  @ViewChild(TablaDinamicaComponent) tablaDinamica!: TablaDinamicaComponent;
  @ViewChild('passwordTemplate', { static: true }) passwordTemplate!: TemplateRef<any>;

  // === Variables ===
  newPassword = '';
  selectedUserId?: number;

  // VALIDADORES PARA EL CAMBIO DE PASSWORD
  get hasLower(): boolean  { return /[a-z]/.test(this.newPassword); }
  get hasUpper(): boolean  { return /[A-Z]/.test(this.newPassword); }
  get hasNumber(): boolean { return /\d/.test(this.newPassword); }
  get hasMinLength(): boolean { return this.newPassword?.length >= 8; }

  constructor(
    private dialogService: DialogService,
    private _alertService: AppAlertService,
    private _confirmationService: ConfirmationService,
    private _usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.actions = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        action: (row) => this.onEdit(row)
      },
      {
        label: 'Cambiar Contraseña',
        icon: 'pi pi-key',
        usarPopover: true,                      
        popoverTemplate: this.passwordTemplate, 
        action: (row: IUsuario) => {
          this.selectedUserId = row.id;
          this.newPassword = '';
        }
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
    const ref = this.dialogService.open(SaveUsuarioComponent, {
      header: 'Crear Usuario',
      styleClass: 'p-fluid',
      modal: true,
      dismissableMask: false,
      focusOnShow: false,
      closable: true,
      breakpoints: {
        '960px': '85vw',
        '640px': '90vw'
      },
    });
    
    ref?.onClose.subscribe((result: { ok: boolean; mensaje: string }) => {
      if (result?.ok) {
        this._alertService.success(result.mensaje);
        this.tablaDinamica.loadData({ first: 0, rows: 10 });
      }
    });
  }

  onEdit(row: any) {
    const ref = this.dialogService.open(SaveUsuarioComponent, {
      header: 'Editar Usuario',
      data: row,
      styleClass: 'p-fluid',
      modal: true,
      dismissableMask: false,
      focusOnShow: false,
      closable: true,
      breakpoints: {
        '960px': '85vw',
        '640px': '90vw'
      },
    });
    
    ref?.onClose.subscribe((result: { ok: boolean; mensaje: string }) => {
      if (result?.ok) {
        this._alertService.success(result.mensaje);
        this.tablaDinamica.loadData({ first: 0, rows: 10 });
      }
    });
  }

  onCancelPassword() {
    this.newPassword = '';
    this.selectedUserId = undefined;
    this.tablaDinamica.closePopover();
  }

  confirmChangePassword() {
    if (!(this.hasLower && this.hasUpper && this.hasNumber && this.hasMinLength)) {
      this._alertService.error('La contraseña no cumple los requisitos.');
      return;
    }

    this._usuariosService.updateUsuario(this.selectedUserId!, { password: this.newPassword })
      .subscribe({
        next: () => {
          this._alertService.success('Contraseña actualizada correctamente');
          this.newPassword = '';
          this.selectedUserId = undefined;
          this.tablaDinamica.closePopover();
          this.tablaDinamica.loadData({ first: 0, rows: 10 });
        },
        error: (err) => {
          console.error(err);
          this._alertService.error('No se pudo actualizar la contraseña');
        }
      });
  }

  onDeactivate(row: any) {
    const displayName = this.getUserDisplayName(row);
    this._confirmationService.confirm({
      message: `¿Seguro que deseas desactivar al usuario <b>${displayName}</b>?`,
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

  onActivate(row: any) {
    const displayName = this.getUserDisplayName(row);
    this._confirmationService.confirm({
      message: `¿Seguro que deseas activar al usuario <b>${displayName}</b>?`,
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
    this._usuariosService.updateUsuario(id, { isActive }).subscribe({
      next: () => {
        this._alertService.success(
          `Usuario ${isActive ? 'activado' : 'desactivado'} correctamente`
        );
        this.tablaDinamica.loadData({ first: 0, rows: 10 });
      },
      error: (err) => {
        console.error(err);
        this._alertService.error('No se pudo actualizar el estado del usuario');
      }
    });
  }

  private getUserDisplayName(row: any): string {
    const firstName = row.firstName && row.firstName !== '-' ? row.firstName : '';
    const lastName = row.lastName && row.lastName !== '-' ? row.lastName : '';
    const name = `${firstName} ${lastName}`.trim();

    return name || row.email;
  }
}
