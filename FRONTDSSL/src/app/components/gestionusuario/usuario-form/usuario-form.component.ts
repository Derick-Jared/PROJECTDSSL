import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/UsuarioModel';
import { Persona } from 'src/app/models/PersonaModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { PersonaService } from 'src/app/services/persona.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario.service';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  selectedTipoUsuarioId: number | null = null;
  personaForm!: FormGroup;
  userForm!: FormGroup;
  submited = false;
  user: Usuario | undefined;
  persona: Persona | undefined;
  isEditMode = false;
  tipoUsuarios: any []=[];

  constructor(private personaService: PersonaService, private fb: FormBuilder, private tipoUsuarioService: TipoUsuarioService) {
    this.personaForm = this.fb.group({
      dni: [''],
      nombres: [''],
      apellidos: [''],
      direccion: [''],
      email: [''],
      telefono: [''],
      password: ['']
    })

    this.userForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    this.loadTipoUsuario();
    this.personaForm = this.fb.group({
      // tipo_documento: [this.persona?.tipo_documento || '', Validators.required],
      // cedula: [this.persona?.cedula || '', [Validators.required]],
      // nombres: [this.persona?.nombres || '',],
      // apellidos: [this.persona?.apellidos || '',],
      // razon_social: [this.persona?.razon_social || '',],
      // email: [this.persona?.email || '', [Validators.required]],
      // direccion: [this.persona?.direccion || ''],
      // telefono: [this.persona?.telefono || ''],
      // password: [this.user?.password || '', [Validators.required]]
    })
  }


  loadTipoUsuario(){
    this.tipoUsuarioService.getTiposUsers().subscribe(
      (response) => {
        this.tipoUsuarios = response;
      },
      (error) => console.error("error en el loading", error)
    );
  }

  onSelectChange(event: any): void {
    this.selectedTipoUsuarioId = +event.target.value; // Convert to number
    console.log('ID seleccionado:', this.selectedTipoUsuarioId);
  }

  

  onSubmit(){
    
  }

}
