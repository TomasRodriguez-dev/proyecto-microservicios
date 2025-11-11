import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TablaDinamicaService {
    constructor(
        private http: HttpClient,
    ) { }

    /**
     * 
     * @param endpoint La url completa del servicio utilizado para obtener datos que se usaran en la tabla.
     * @param filter El filtro que se aplicara a la consulta.
     * @returns 
     */
    getData(endpoint: string, filter: string): Observable<any> {
        var subject = new Subject<any>();
        this.http.get(`${endpoint}${filter}`, { observe: 'response' }).subscribe((resp: any) => {
            subject.next({
                'data': resp.body || {},
                'totalPages': resp.headers.get('X-Pagination-Page-Count') || 0,
                'totalCount': resp.headers.get('X-Pagination-Total-Count') || 0
            });
        }, error => {
            console.error('Error al obtener datos:', error);
            subject.error(error);
        });
        return subject.asObservable();
    }

    /**
     * Método para obtener datos usando POST
     * @param endpoint La url completa del servicio utilizado para obtener datos que se usaran en la tabla.
     * @param body El cuerpo de la solicitud POST.
     * @returns Un Observable con los datos de la respuesta.
     */
    postData(endpoint: string, body: any): Observable<any> {
        return this.http.post(`${endpoint}`, body, { observe: 'response' }).pipe(
            map((resp: any) => {
                return {
                    'data': resp.body,
                    'totalPages': resp.headers.get('X-Pagination-Page-Count'),
                    'totalCount': resp.headers.get('X-Pagination-Total-Count')
                };
            })
        );
    }
}