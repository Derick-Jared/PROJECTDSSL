import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/ProductoModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl: string = 'http://localhost:3000/api/producto';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
      return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductsByIdCategory(categoriaId: number): Observable<Producto[]> {
    const url = `${this.apiUrl}/categoria/${categoriaId}`;
    return this.http.get<Producto[]>(url);
}
}
