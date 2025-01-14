import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetalleVenta } from '../models/DetalleVentaModel';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {
  private apiUrl: string = 'http://localhost:3000/api/detalleventa';
    constructor(private http: HttpClient) { }
  
    createDetalleVenta(model: DetalleVenta): Observable<DetalleVenta> {
          return this.http.post<DetalleVenta>(this.apiUrl, model);
    }
}
