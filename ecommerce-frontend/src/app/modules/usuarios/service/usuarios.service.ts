import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { IUsuario } from "../model/usuario.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UsuariosService {
    private endpoints = environment.api.usuarios;

    constructor(private http: HttpClient) {}

    /**
     * Crea un nuevo usuario
     */
    createUsuario(usuario: IUsuario): Observable<IUsuario> {
        return this.http.post<IUsuario>(`${this.endpoints}`, usuario);
    }

    /**
     * Actualiza un usuario existente
     */
    updateUsuario(id: number, usuario: Partial<IUsuario>): Observable<IUsuario> {
        return this.http.patch<IUsuario>(`${this.endpoints}/${id}`, usuario);
    }
}
