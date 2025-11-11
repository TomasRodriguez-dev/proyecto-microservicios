import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppAlertService } from "../../../../shared/service/alert.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { finalize, firstValueFrom } from "rxjs";
import { ProductosService } from "../../service/productos.service";
import { IProducto } from "../../model/producto.model";

@Component({
    selector: 'app-save-productos',
    templateUrl: './save-producto.component.html',
    styleUrls: ['./save-producto.component.scss'],
    standalone: false
})
export class SaveProductoComponent implements OnInit {
    form!: FormGroup;
    producto!: IProducto; 
    loading = false;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig,
        private fb: FormBuilder,
        private _alertService: AppAlertService,
        private _productosService: ProductosService
    ) {
        this.producto = this.config.data;
    }

    ngOnInit(): void {
        this.newForm();
    }

    newForm() {
        const limpiar = (v: any) => (v && v !== '-' ? v : ''); // Se limpia los campos debido al formateo de la Tabla Dinamica

        this.form = this.fb.group({
            name: [limpiar(this.producto?.name), Validators.required],
            price: [limpiar(this.producto?.price), Validators.required],
            stock: [limpiar(this.producto?.stock), Validators.required],
        });
    }

    async onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        
        const formValue = this.form.value;
        const parsedPrice = parseFloat(
            String(formValue.price)
            .replace(/[^\d,.,]/g, '')  
            .replace(/\./g, '')        
            .replace(',', '.')         
        );
        const payload: IProducto = {
            id: this.producto?.id, // id si existe
            name: formValue.name,
            price: parsedPrice,
            stock: formValue.stock
        }

        this.loading = true;

        try {
            if (this.producto?.id) {
                // Editar producto existente
                await firstValueFrom(
                    this._productosService.updateProducto(this.producto.id, payload)
                    .pipe(finalize(() => (this.loading = false)))
                );
                this.ref.close({ ok: true, mensaje: 'Producto actualizado correctamente' });
            } else {
                // Crear producto usuario
                await firstValueFrom(
                    this._productosService.createProducto(payload)
                    .pipe(finalize(() => (this.loading = false)))
                );
                this.ref.close({ ok: true, mensaje: 'Producto creado correctamente' });
            }
        } catch (error: any) {
            this.loading = false;
            this._alertService.error('Ocurrió un error al guardar el producto');
            console.error('[SaveProducto] Error:', error);
        }
    }

    onDialogHide() {
        this.ref.close();
    }

    // Formateo Moneda
    formatPrice(): void {
        const value = this.form.get('price')?.value;
        const numericValue = parseFloat(
            String(value).replace(/[^\d,.-]/g, '').replace(',', '.')
        );

        if (!isNaN(numericValue)) {
            const formatted = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: 2,
            }).format(numericValue);

            this.form.patchValue({ price: formatted }, { emitEvent: false });
        }
    }

    onPriceInput(event: any) {
        // Permite solo números, comas, puntos y borra el resto
        event.target.value = event.target.value.replace(/[^\d,.,]/g, '');
        this.form.get('price')?.setValue(event.target.value, { emitEvent: false });
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
