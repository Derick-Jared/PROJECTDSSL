import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/CategoriaModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl: string = 'http://localhost:3000/api/categoria';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl);
  }

  
}
