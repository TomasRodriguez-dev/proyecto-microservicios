import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { IProducto } from "../model/producto.model";

@Injectable({ providedIn: 'root' })
export class ProductosService {
    private endpoints = environment.api.productos;

    constructor(private http: HttpClient) {}

    /**
     * Crea un nuevo producto
     */
    createProducto(producto: IProducto): Observable<IProducto> {
        return this.http.post<IProducto>(`${this.endpoints}`, producto);
    }

    /**
     * Actualiza un producto existente
     */
    updateProducto(id: number, producto: Partial<IProducto>): Observable<IProducto> {
        return this.http.patch<IProducto>(`${this.endpoints}/${id}`, producto);
    }
}
