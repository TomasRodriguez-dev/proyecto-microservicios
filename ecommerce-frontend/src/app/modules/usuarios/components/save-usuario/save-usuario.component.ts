import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppAlertService } from "../../../../shared/service/alert.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { IUsuario } from "../../model/usuario.model";
import { UsuariosService } from "../../service/usuarios.service";
import { finalize, firstValueFrom } from "rxjs";

@Component({
    selector: 'app-save-usuarios',
    templateUrl: './save-usuario.component.html',
    styleUrls: ['./save-usuario.component.scss'],
    standalone: false
})
export class SaveUsuarioComponent implements OnInit {
    form!: FormGroup;
    usuario!: IUsuario;
    loading = false;
    rolesDisponibles = [
        { label: 'User', value: 'USER' }
    ];

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private _alertService: AppAlertService,
        private _usuariosService: UsuariosService
    ) {
        this.usuario = this.config.data;
    }

    ngOnInit(): void {
        this.newForm();
    }

    newForm() {
        const limpiar = (v: any) => (v && v !== '-' ? v : ''); // Se limpia los campos debido al formateo de la Tabla Dinamica

        this.form = this.fb.group({
            email: [limpiar(this.usuario?.email), [Validators.required, Validators.email]],
            password: ['', this.usuario ? [] : [Validators.required, Validators.minLength(8)]],
            roles: [this.usuario?.roles?.[0] || '', Validators.required],
            firstName: [limpiar(this.usuario?.firstName), Validators.required],
            lastName: [limpiar(this.usuario?.lastName), Validators.required],
            isActive: [this.usuario?.isActive ?? true]
        });
    }

    async onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const formValue = this.form.value;
        const payload: IUsuario = {
            id: this.usuario?.id, // id si existe
            email: formValue.email,
            password: formValue.password,
            roles: formValue.roles,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
        };

        // si estoy editando y la password está vacía, no la mando
        if (this.usuario?.id && !payload.password) {
            delete payload.password;
        }

        // limpiar campos vacíos (null o '')
        Object.keys(payload).forEach(
            key => (payload as any)[key] === '' || (payload as any)[key] === null
            ? delete (payload as any)[key]
            : null
        );

        this.loading = true;

        try {
            if (this.usuario?.id) {
                // Editar usuario existente
                await firstValueFrom(
                    this._usuariosService.updateUsuario(this.usuario.id, payload)
                    .pipe(finalize(() => (this.loading = false)))
                );
                this.ref.close({ ok: true, mensaje: 'Usuario actualizado correctamente' });
            } else {
                // Crear nuevo usuario
                await firstValueFrom(
                    this._usuariosService.createUsuario(payload)
                    .pipe(finalize(() => (this.loading = false)))
                );
                this.ref.close({ ok: true, mensaje: 'Usuario creado correctamente' });
            }
        } catch (error: any) {
            this.loading = false;
            this._alertService.error('Ocurrió un error al guardar el usuario');
            console.error('[SaveUsuario] Error:', error);
        }
    }
    onDialogHide() {
        this.ref.close();
    }

    // Validaciones de contraseña
    get password(): string {
        return this.form.get('password')?.value || '';
    }
    get hasLower(): boolean {
        return /[a-z]/.test(this.password);
    }
    get hasUpper(): boolean {
        return /[A-Z]/.test(this.password);
    }
    get hasNumber(): boolean {
        return /\d/.test(this.password);
    }
    get hasMinLength(): boolean {
        return this.password.length >= 8;
    }
}
