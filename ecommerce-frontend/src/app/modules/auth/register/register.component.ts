import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/service/auth.service';
import { AppAlertService } from '../../../shared/service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  success = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _authService: AuthService,
    private _alertService: AppAlertService
  ) {}

  ngOnInit(): void {
    this.newForm();
  }

  newForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get password(): string {
    return this.form.get('password')?.value || '';
  }

  submit() {
    if (!this.form.valid){
      this.form.markAllAsTouched();
      return;
    } 
    this.loading = true;
    this.success = false;

    this._authService.register(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.success = true;
        this._alertService.success(res.mensaje);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.loading = false;
        const msg =
          err.error?.mensaje ||
          err.error?.message ||
          'Ocurrió un error register';

        this.form.get('email')?.setErrors({ invalid: true });
        this.form.get('password')?.setErrors({ invalid: true });

        this._alertService.error(msg);
        console.error(err.error?.message || 'Error en register');
      }
    })
  }

  // Validaciones
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
