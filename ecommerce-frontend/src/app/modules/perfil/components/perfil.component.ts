import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppAlertService } from '../../../shared/service/alert.service';
import { IUsuario } from '../../usuarios/model/usuario.model';
import { AuthService } from '../../../core/auth/service/auth.service';
import { ConfirmationService } from 'primeng/api';
import { UsuariosService } from '../../usuarios/service/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: false
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;
  user!: IUsuario;
  userInitials = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  editing = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private alert: AppAlertService,
    private authService: AuthService,
    private confirmService: ConfirmationService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.newForm();
    this.setInitials();
  }

  setInitials() {
    if (this.user?.firstName && this.user?.lastName) {
      this.userInitials =
        (this.user.firstName[0] || '').toUpperCase() +
        (this.user.lastName[0] || '').toUpperCase();
    }
  }

  newForm() {
    this.form = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      country: [this.user.country, Validators.required],
      birthDate: [this.user.birthDate ? new Date(this.user.birthDate) : null,  
        Validators.required
      ],
      phone: [this.user.phone, Validators.required],
      state: [this.user.state, Validators.required],
      city: [this.user.city, Validators.required],
      addressLine: [this.user.addressLine, Validators.required],
      postalCode: [this.user.postalCode, Validators.required],
    });
  }

  confirmEdit() {
    this.confirmService.confirm({
      message: '¿Desea editar su información personal?',
      header: 'Confirmar edición',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-sm p-button-primary',   
      rejectButtonStyleClass: 'p-button-sm p-button-danger', 
      accept: () => this.editing = true,
      reject: () => this.editing = false
    });
  }

  onCancelEdit() {
    this.editing = false;
    this.form.patchValue(this.user); // restaura valores originales
    this.alert.info('Edición cancelada');
  }

  onSave(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      this.alert.warn('Por favor complete los campos requeridos antes de guardar.');
      return;
    }

    const { firstName, lastName, country, birthDate, phone, state, city, addressLine, postalCode } = this.form.value;

    const payload = {
      firstName,
      lastName,
      country,
      birthDate,
      phone,
      state,
      city,
      addressLine,
      postalCode
    };

    this.loading = true;

    this.usuariosService.updateUsuario(this.user.id, payload).subscribe({
      next: (response) => {
        this.user = response;
        this.authService.setUser(response);
        this.alert.success('Perfil actualizado correctamente');
        this.editing = false;
      },
      error: (err) => {
        console.error(err);
        this.alert.error('Ocurrió un error al actualizar el perfil');
      },
      complete: () => this.loading = false
    });
  }

  onAvatarChange(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  uploadAvatar() {
    if (!this.selectedFile) return;
    console.log('Archivo seleccionado:', this.selectedFile);
    // ejemplo: this.usuariosService.updateAvatar(this.user.id, this.selectedFile).subscribe(...)
    this.alert.success('Avatar actualizado (simulado)');
  }
}
