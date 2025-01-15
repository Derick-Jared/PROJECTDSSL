import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/PersonaModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';

@Component({
  selector: 'app-gestionusuario',
  templateUrl: './gestionusuario.component.html',
  styleUrls: ['./gestionusuario.component.css']
})
export class GestionusuarioComponent implements OnInit{
  
  usuarios:Usuario[]=[];
  tipoUsuarios:TipoUsuario[]=[];
  personas:Persona[]=[];
  constructor(private usuarioService: UsuarioService,private personaService: PersonaService, private tipoUsuarioService: TipoUsuarioService){
    
    }
  
    ngOnInit(): void {
      this.loadUsuarios();
      this.loadPersons();
      this.loadTipoUsuarios();
    }

    loadUsuarios(): void {
      this.usuarioService.getUsers().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
        (response)=>this.usuarios=response,
        (error)=>console.error("error en el loading",error)
      )
    }

    loadTipoUsuarios(): void {
      this.tipoUsuarioService.getTiposUsers().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
        (response)=>this.tipoUsuarios=response,
        (error)=>console.error("error en el loading",error)
      )
    }

    loadPersons(): void {
      this.personaService.getPersons().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
        (response)=>this.personas=response,
        (error)=>console.error("error en el loading",error)
      )
    }

    getDni(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      console.log("dni:"+pers?.dni);
      return pers ? pers.dni : 'Sin Dni' ;
    }

    getNombres(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      return pers ? pers.nombres : 'Sin Nombres' ;
    }

    getApellidos(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      return pers ? pers.apellidos : 'Sin Apellidos' ;
    }

    getDireccion(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      return pers ? pers.direccion : 'Sin Direccion' ;
    }

    getTelefono(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      return pers ? pers.telefono : 'Sin Telefono' ;
    }

    getEmail(id_persona: number): string {
      const pers = this.personas.find(p => p.id === id_persona);
      return pers ? pers.email : 'Sin Email' ;
    }

    getNombreTipoUsuario(id_persona: number): string {
      const pers = this.tipoUsuarios.find(p => p.id === id_persona);
      return pers ? pers.nombre : 'Sin Nombre' ;
    }

    openModalUsuario(){
      
    }

    
}
