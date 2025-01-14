import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/UsuarioModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl: string = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.apiUrl);
  }
}
