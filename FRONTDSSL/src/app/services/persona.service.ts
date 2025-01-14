import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/PersonaModel';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl: string = 'http://localhost:3000/api/persona';

  constructor( private http: HttpClient) { }

  getPersons(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  getPerson(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  createPerson(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  updatePerson(id: number, persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.apiUrl}/${id}`, persona);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/clientes`);
  }

  getStaff(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personal`);
  }
}
